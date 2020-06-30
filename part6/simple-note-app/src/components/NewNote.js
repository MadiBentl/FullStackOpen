import React from 'react'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNote(content)
  }
  return(
    <form onSubmit={ addNote }>
      <input name='note'/>
      <button type='submit'>Add note</button>
    </form>
  )
}

export default connect(null, { createNote })(NewNote)
