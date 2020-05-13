import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
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

  const newBlogForm = () => (
    <>
      <h2>Add a new blog</h2>
      <form onSubmit = {handleNewBlog}>
        <div>
          Title
          <input
            name='title'
            value={newBlog.title}
            type='text'
            onChange={({target}) => setNewBlog({...newBlog, title:target.value})}
          />
        </div>
        <div>
          Author
          <input
            name='author'
            value={newBlog.author}
            type='text'
            onChange={({target}) => setNewBlog({...newBlog, author:target.value})}
          />
        </div>
        <div>
          Url
          <input
            name='url'
            value={newBlog.url}
            type='text'
            onChange={({target}) => setNewBlog({...newBlog, url:target.value})}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  )

  const blogList = () => (
    <>
      {notification.msg !== null && <Notification message={notification.msg} colour={notification.colour} />}
      <h2>blogs</h2>
      <p>{`${user.username} is currently logged in`}</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try{
      const blog = await blogService.create({
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      })
      setNewBlog({title: '', author: '', url: ''})
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

  return (
    <div>
    {notification.msg !== null ?? <Notification message={notification.msg} colour={notification.colour}/>}
    {user === null ?
      loginForm() :
      blogList()
    }
    {newBlogForm()}
    </div>
  )
}

export default App
