import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [notification, setNotification] = useState({msg:null, colour:null})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
    <h2>Login</h2>
    <form onSubmit = {handleLogin}>
    <div>
      Username
        <input
          type = 'test'
          name = 'Username'
          value = {username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type = 'password'
          name = 'password'
          value = {password}
          onChange = {({target}) => setPassword(target.value)}
        />
      </div>
      <button type = 'submit'>login</button>
    </form>

    </>
  )

  const LogOutButton = () => (
    <>
      <p>{user.username} is logged in</p>
      <button onClick={handleLogOut}>log out</button>
    </>
  )

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const blogList = () => (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const likeBlog = async (editedBlog) => {
    const blog = await blogService.incrementLikes(blog)
  }

  const handleNewBlog = async (newBlog) => {
    try{
      BlogFormRef.current.toggleVisibility()
      const blog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
        user: user.username
      })
      setBlogs(blogs.concat(blog))
    } catch(exception) {
      setNotification({msg: 'exception', colour:'bad-notification'});
      setTimeout(function () {
        setNotification({msg: null, colour: null})
      }, 5000);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch(exception){
        setNotification({msg:exception, colour: 'bad-notification'});
        setTimeout(function () {
          setNotification(null)
        }, 5000);
    }
  }

  const BlogFormRef = React.createRef()
  return (
    <div>
    {notification.msg !== null ?? <Notification message={notification.msg} colour={notification.colour}/>}
    {user === null ?
      <Togglable buttonLabel='Log in'>
        {loginForm()}
      </Togglable>
      :<><LogOutButton />
      <Togglable buttonLabel='Add a note' ref={BlogFormRef}>
        <BlogForm handleNewBlog ={handleNewBlog}/>
      </Togglable>
      </>
    }
    {blogList()}
    </div>
  )
}

export default App