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

export const ALL_BOOKS = gql`
  query{
    allBooks {
      title
      published
      author {
        name
      }
      id
      genres
    }
  }
`

export const ALL_GENRES = gql`
  query{
    allGenres
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
      author {
        name
      }
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`
