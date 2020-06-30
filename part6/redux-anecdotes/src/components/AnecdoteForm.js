import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    await props.addAnecdote(content)
  }
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, { addAnecdote })(AnecdoteForm)
