import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Button, TextField } from '@material-ui/core'


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
          <TextField
            variant="outlined"
            label='Username'
            type = 'text'
            name = 'Username'
            id='username'
            value = {username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            label='Password'
            type = 'password'
            name = 'password'
            id = 'password'
            value = {password}
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id='login_button' color='primary' variant="contained" type = 'submit'>login</Button>
      </form>
    </>
  )
}

export default LoginForm
