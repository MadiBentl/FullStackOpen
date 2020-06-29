const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

mongoose.set('useFindAndModify', false)
const MONGODB_URI = `mongodb+srv://mbentley:${process.env.MONGODB_PASSWORD}@cluster0-bbvhv.mongodb.net/<dbname>?retryWrites=true&w=majority
`
console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true})
  .then(() => console.log('connected to mongodb'))
  .catch(err => console.log("did not connect to mongodb ", err.message))

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author
    id: ID!
    published: Int!
    genres: [String!]!
  }
  type Author{
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!,
      genres: [String!]!
    ) : Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      password: String!
      username: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      return await Book.collection.countDocuments()
    },
    authorCount: async (root, args) => {
      return await Author.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      const query = {}
      if(args.author){
        const author = await Author.findOne({name: args.author})
        console.log(author, args.author)
        query['author'] = author._id
      }
      if (args.genre){
        query['genres'] = args.genre
      }
        return await Book.find(query).populate('author')
    },
    allAuthors: async (root, args) => {
      let authors = await Author.find({}).lean()
      console.log(authors)
      authors = await Promise.all(authors.map(async a => {
        bookTotal = await Book.countDocuments({author: new mongoose.Types.ObjectId(a._id)})
        return {...a, bookCount: bookTotal, id: mongoose.Types.ObjectId(a.id)}
      }))


      console.log(authors)
      return authors
    },
    me: (root, args, context) => { return context.currentUser}
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser){
        throw new UserInputError('must be logged in')
      }
      const book = new Book({...args})
      const author = await Author.findOne({name: args.author})
      try {
        if (author){
          book.author = author
          await book.save()
        }
        else{
          const newAuthor = await new Author({name: args.author}).save()
          console.log(newAuthor)
          book.author = newAuthor
          await book.save()
        }
        return book.populate('type')
      } catch (err) {
          throw new UserInputError(err.message, {invalidArgs: args})
      }
    },
    editAuthor: async (root, args) => {
      if (!context.currentUser){
        throw new UserInputError('must be logged in')
      }
      const author = await Author.findOne({name: args.name})
      try {
        author.born = args.setBornTo
        return author.save()
      }catch (err) {
        throw new UserInputError(err.message, {invalidArgs: args})
      }
      return author
    },
    createUser: async (root, args) => {
      try{
        const user = new User({...args})
        const response = await user.save()
        return response
      }catch(err) {
        throw new UserInputError(err.message, {invalidArgs: args})
      }
    },
    login: async (root, args) => {
      try{
        const user = await User.findOne({username: args.username})
        if (user && args.password === 'password'){
          const userForToken = {
            username: user.username,
            id: user._id
          }
          console.log(user, userForToken)
          return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
      }catch(err) {
        throw new UserInputError('Wrong credentials')
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
