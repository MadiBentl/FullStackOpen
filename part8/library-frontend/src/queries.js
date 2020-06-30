import { gql } from '@apollo/client'

export const getAllAuthors = gql`
  query{
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const getAllBooks = gql`
  query{
    allBooks {
      title,
      author,
      published,
      id
    }
  }
`

export const CREATE_BOOK =  gql`
  mutation createBook($author: String!, $title: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
      id
    }
  }
`
export const ADD_YEAR = gql`
  mutation addYear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      id
    }
  }
`
