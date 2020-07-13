import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const response = useQuery(ALL_BOOKS)
  let genres = useQuery(ALL_GENRES)

  const [filter, setFilter] = useState(null)

  if (!props.show) {
    return null
  }
  if (response.loading) {
    return 'loading...'
  }
  console.log(response.data.allBooks)
  const books = filter ? response.data.allBooks.filter(b => b.genres.includes(filter)) : response.data.allBooks

  const handleButtonClick = (genre) => {
    setFilter(genre)
  }

  const renderFilters = () => {
    if (genres.loading){
      return null
    }
    genres = genres.data.allGenres
    console.log(genres)
    return genres.map(genre =>
       <button onClick={() => handleButtonClick(genre)} key={genre}>{genre}</button>
    )
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
              <td>{a.author ? a.author.name : 'no author'}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>Filter: {genres? renderFilters() : null}<button onClick={() => setFilter(null)}>all</button></div>
    </div>
  )
}

export default Books

/*
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

*/
