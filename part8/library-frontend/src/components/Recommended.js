import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
  const response = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if (!props.show){
    return null
  }
  if (response.loading || user.loading){
    return '...loading'
  }
  const bookRecs = response.data.allBooks.filter(b => b.genres.includes(user.data.me.favouriteGenre))
  console.log(response, user, bookRecs)

  return (
    <>
    <h1>Recommendations - Books in your favourite genre </h1>
    <table>
      <tbody>
        <tr>
          <th>title</th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {bookRecs.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author ? a.author.name : 'no author'}</td>
            <td>{a.published}</td>
          </tr>
        )}
      </tbody>
      </table>
    </>
  )
}

export default Recommended
