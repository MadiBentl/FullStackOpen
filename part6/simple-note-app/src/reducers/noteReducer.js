import noteService from '../services/notes'

const noteReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_NOTE':
    state = state.concat(action.data)
    return state
  case 'TOGGLE_IMPORTANCE': {
    const id = action.data.id
    const noteToChange = state.find(n => n.id === id)
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important
    }
    return state.map(note =>
      note.id !== id ? note : changedNote
    )
  }
  case 'INIT_NOTE': {
    return action.data
  }
  default:
    return state
  }
}

//action creators
export const toggleImportanceOf = (id) => {
  return({
    type: 'TOGGLE_IMPORTANCE',
    data: { id: id }
  })
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTE',
      data: notes
    })
  }
}

export const createNote = (data) => {
  return async dispatch => {
    const note = await noteService.createNote(data)
    dispatch({
      type: 'ADD_NOTE',
      data: note
    })
  }
}

export default noteReducer
