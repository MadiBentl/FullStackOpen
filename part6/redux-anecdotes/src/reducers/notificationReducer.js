const notificationReducer = (state = { message:null }, action) => {
  switch(action.type){
  case 'SETMESSAGE':
    return action.message
  case 'RESET':
    return { message: null }
  default:
    return state
  }
}

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch({ type: 'SETMESSAGE', message })
    setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, seconds * 1000)
  }
}

export const clearMessage = () => {
  return({
    type: 'RESET'
  })
}
export default notificationReducer
