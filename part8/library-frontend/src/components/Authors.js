import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { getAllAuthors, ADD_YEAR } from '../queries'

const BirthYear = (props) => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [ addYear ] = useMutation(ADD_YEAR)
  const submit = async (event) => {
    event.preventDefault()
    console.log(name, date)
    addYear({ variables: {name, setBornTo: Number(date)} })

  }
  return (
    <div>
      <form onSubmit = {submit}>
        Name
        <select value={name} onChange={({target}) => setName(target.value)}>
        {props.authors.map(author => {
        return  <option key={author.id} value={author.name}>{author.name}</option>
        })}
        </select>
        Date
        <input value={date} type='number' onChange={({target}) => setDate(target.value)}/>
        <button type='submit'>Add date</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const response = useQuery(getAllAuthors)
  console.log(response.data)
  if (!props.show) {
    return null
  }
  if (response.loading){
    return null
  }
  const authors = response.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthYear authors={authors}/>
    </div>
  )
}

export default Authors
