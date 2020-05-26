const initialState = [
    {
      content: 'reducer defines how redux store works',
      important: true,
      id: 1,
    },
    {
      content: 'state of store can contain any data',
      important: false,
      id: 2,
    }
  ]


const noteReducer = (state = initialState, action) => {
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

const generateId = () => {
  return Number((Math.random() * 100000000).toFixed(0))
}

//action creators
export const toggleImportanceOf = (id) => {
  return({
    type: 'TOGGLE_IMPORTANCE',
    data: {id: id}
  })
}
export const createNote = (content) => {
  return({
    type: 'ADD_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  })
}

export default noteReducer
