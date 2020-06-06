import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import UserDashboard from './components/Users'
import UserView from './components/UserView'
import BlogDetail from './components/BlogDetail'
import Navbar from './components/Navbar'

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
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setInitialUser(user))
    }
  }, [dispatch])


  const BlogFormRef = React.createRef()
  return (
    <Router>
      <div>
        <Navbar />
        {notification !== null && <Notification />}
        {user === null ?
          <Togglable buttonLabel='Log in'>
            <LoginForm />
          </Togglable>
          :<>
            <Togglable buttonLabel='Add a blog' ref={BlogFormRef}>
              <BlogForm />
            </Togglable>
          </>
        }
        <Switch>
          <Route path='/Users/:id'>
            <UserView />
          </Route>
          <Route path='/Users'>
            <UserDashboard />
          </Route>
          <Route path = '/:id'>
            <BlogDetail />
          </Route>
          <Route path='/'>
            <BlogList />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
