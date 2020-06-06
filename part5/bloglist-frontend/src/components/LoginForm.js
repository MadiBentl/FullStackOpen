import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { setMessage, clearMessage } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
      /*.then(() => {
        console.log(user)
        if (user === null){
          dispatch(setMessage('Wrong user or pass or whatever', 'bad-notification'))
          setTimeout(() => {
            dispatch(clearMessage())
          }, 5000)
        }else{
          dispatch(setMessage('You logged in', 'good-notification'))
          setTimeout(() => {
            dispatch(clearMessage())
          }, 5000)
        }
      })*/
    setUsername('')
    setPassword('')
  }

  return(
    <>
      <h2>Login</h2>
      <form onSubmit = {handleLogin}>
        <div>
      Username
          <input
            type = 'text'
            name = 'Username'
            id='username'
            value = {username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        Password
          <input
            type = 'password'
            name = 'password'
            id = 'password'
            value = {password}
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login_button' type = 'submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
