import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const LogOutButton = () => {
  const user = useSelector(state => state.login.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout(null))
    window.localStorage.removeItem('loggedInUser')
  }

  return(
    <>
      <p>{user} is logged in</p>
      <button onClick={handleLogOut}>log out</button>
    </>
  )
}

export default LogOutButton
