import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state= { user: null }, action) => {
  switch(action.type){
    case 'LOGIN':
      console.log('user', action.user)
      return { user: action.user }
    case 'LOGOUT':
      return { user: null }
    case 'SET_INITIAL_USER':
      return { user: action.user }
    default:
      return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try{
      const user = await loginService.login(credentials)
      if (user){
        dispatch({ type: 'LOGIN', user: credentials.username })
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({ type: 'SET_NOTIFICATION', data:{ msg:'YEEAAAA', style:'good-notification' } })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      }
    }catch(exception){
      dispatch({ type: 'SET_NOTIFICATION', data:{ msg:'ahhhhh', style:'bad-notification' } })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }
}

export const setInitialUser = (user) => {
  return async dispatch => {
    await blogService.setToken(user.token)
    dispatch({ type: 'SET_INITIAL_USER', user: user.username })
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedInUser')
  return({ type: 'LOGOUT' })
}

export default loginReducer
