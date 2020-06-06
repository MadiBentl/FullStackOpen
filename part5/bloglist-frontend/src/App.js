import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import './App.css'

import { getInitialBlogs } from './reducers/blogReducer'
import { setInitialUser } from './reducers/loginReducer'

const App = () => {
  const user = useSelector(state => state.login.user)
  const notification = useSelector(state => state.notification)
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


  const BlogFormRef = React.createRef()
  return (
    <div>
      {notification !== null && <Notification />}
      {user === null ?
        <Togglable buttonLabel='Log in'>
          <LoginForm />
        </Togglable>
        :<><LogoutButton />
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
