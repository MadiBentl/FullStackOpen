const notificationReducer = (state = { message:null }, action) => {
  switch(action.type){
    case 'SETMESSAGE':
      return action.message
    case 'RESET':
      return {message: null}
    default:
      return state;
  }
}

export const changeMessage = (message) => {
  return({
    type: 'SETMESSAGE',
    message
  })
}

export const clearMessage = () => {
  return({
    type: 'RESET'
  })
}
export default notificationReducer
