import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
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
