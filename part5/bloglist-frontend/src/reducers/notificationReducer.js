const notificationReducer = (state= null, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return { msg: action.data.msg, style: action.data.style }
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setMessage = ( msg, style ) => {
  return { type: 'SET_NOTIFICATION', data: { msg, style } }
}

export const clearMessage = ( ) => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default notificationReducer
