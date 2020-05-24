import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      state = state.concat(action.data)
      return state
    default:
      return state
  }
}

const store = createStore(noteReducer)
store.dispatch({
  type: 'ADD_NOTE',
  data: {
    content: 'This is the first note note',
    important: true,
    id: 1
  }
})
store.dispatch({
  type: 'ADD_NOTE',
  data: {
    content: 'This is a new note',
    important: false,
    id: 2
  }
})
const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note =>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
