import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type){
  case 'NEW_ANECDOTE':
    console.log('action', action)
    return state.concat(action.data)
  case 'VOTE':{
    const newState = state.map(anecdote => {
      if (anecdote.id === action.data.id) {
        return { ...action.data }
      }
      else{
        return anecdote
      }
    })
    return newState.sort((a,b) => {
      return b.votes - a.votes
    })
  }
  case 'INIT_ANECDOTES':
    console.log('data', action.data)
    return action.data.anecdotes.sort((a,b) => {
      return b.votes - a.votes
    })
  default:
    return state
  }
}

//action creators
export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.newAnecdote(content)
    dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
  }
}
export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch({ type: 'VOTE', data: updatedAnecdote })
  }
}

export const loadAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT_ANECDOTES', data: { anecdotes } })
  }
}
export default anecdoteReducer
