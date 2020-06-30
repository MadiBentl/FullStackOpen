import React from 'react'
import { useQuery } from '@apollo/client';
import { getAllBooks } from '../queries'

const Books = (props) => {
  const response = useQuery(getAllBooks)
  console.log(response.data)
  if (response.loading){
    return null
  }
  const books = response.data.allBooks
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
