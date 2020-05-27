import React from 'react'
import { createNote } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }
  return(
    <form onSubmit={ addNote }>
      <input name='note'/>
      <button type='submit'>Add note</button>
    </form>
  )
}

export default NewNote
