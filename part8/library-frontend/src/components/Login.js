import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries.js'


const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: err => console.log(err.graphQLErrors[0].message)
  })

  useEffect(() => {
    console.log(result.data)
    if (result.data){
      props.setToken(result.data.login.value)
      localStorage.setItem('user-token', result.data.login.value)
    }
  }, [result.data])

  if (!props.show || props.token){
    return null
  }
  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return(
    <form onSubmit={(e) => handleLogin(e)}>
      <div>
        name <input value={username} onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password <input value={password} onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type='submit'>submit</button>
    </form>
  )
}

export default Login
