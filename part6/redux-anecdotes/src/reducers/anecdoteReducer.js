const anecdoteReducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_ANECDOTE':
      const anecdote = action.data.content
      return state.concat(anecdote)
    case 'VOTE':
      const newState = state.map(element => {
        if (element.id === action.data.id){
          return { ...element, votes: element.votes + 1 }
        }
        else{
          return element
        }
      })
      return newState.sort((a,b) => {
        return b.votes - a.votes
      })
    case 'INIT_ANECDOTES':
      console.log('data', action.data)
      return action.data.anecdotes.sort((a,b) => {
        return b.votes - a.votes
      })
    default:
      return state;
  }
}

//action creators
export const addAnecdote = (content) => {
  return({type: 'NEW_ANECDOTE', data: { content }})
}
export const voteAnecdote = (id) => {
  return({type: 'VOTE', data: {id}})
}

export const loadAnecdotes = (anecdotes) => {
  return({type: 'INIT_ANECDOTES', data: {anecdotes}})
}
export default anecdoteReducer
