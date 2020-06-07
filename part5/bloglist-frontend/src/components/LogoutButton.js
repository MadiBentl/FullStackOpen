import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Button } from '@material-ui/core'

const LogOutButton = () => {
  const user = useSelector(state => state.login.user)
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logout(null))
    window.localStorage.removeItem('loggedInUser')
  }

  if (user !== null){
    return(
      <div>
        <p style={{ display: 'inline' }}>{user} is logged in</p>
        <Button color='secondary' onClick={handleLogOut}>log out</Button>
      </div>
    )
  }else{
    return null
  }
}

export default LogOutButton
