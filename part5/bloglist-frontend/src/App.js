import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import './App.css'

import { getInitialBlogs } from './reducers/blogReducer'
import { setInitialUser, logout } from './reducers/loginReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const user = useSelector(state => state.login.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const getReduxBlogs = async () => {
      return await dispatch(getInitialBlogs())
    }
    getReduxBlogs()
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setInitialUser(user))
    }
  }, [])

  const LogOutButton = () => (
    <>
      <p>{user} is logged in</p>
      <button onClick={handleLogOut}>log out</button>
    </>
  )

  const handleLogOut = () => {
    dispatch(logout(null))
    window.localStorage.removeItem('loggedInUser')
  }

  const BlogFormRef = React.createRef()
  return (
    <div>
      {/*  {notification.msg !== null && <Notification message={notification.msg} colour={notification.colour}/>}*/}
      {user === null ?
        <Togglable buttonLabel='Log in'>
          <LoginForm />
        </Togglable>
        :<><LogOutButton />
          <Togglable buttonLabel='Add a blog' ref={BlogFormRef}>
            <BlogForm />
          </Togglable>
        </>
      }
      <BlogList />
    </div>
  )
}

export default App
