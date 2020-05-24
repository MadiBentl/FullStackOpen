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
    default:
      return state
  }
}

export default noteReducer
