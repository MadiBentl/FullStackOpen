const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'NEW_ANECDOTE':
      const anecdote = asObject(action.data.content)
      return state.concat(anecdote)
      break;
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
      break;
    default:
      return state;
  }
  return state
}

//action creators
export const addAnecdote = (content) => {
  return({type: 'NEW_ANECDOTE', data: { content }})
}
export const voteAnecdote = (id) => {
  return({type: 'VOTE', data: {id}})
}
export default reducer
