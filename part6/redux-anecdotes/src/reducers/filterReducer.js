const initialState = ''

const filterReducer = (state = initialState, action) => {
  console.log('action',  action, state)
  switch(action.type){
    case 'FILTER':
      return action.query
    default:
      return state;
  }
  return state
}

export const filterAnecdotes = (query) => {
  return({
    type: 'FILTER',
    query: query
  })
}

export default filterReducer
