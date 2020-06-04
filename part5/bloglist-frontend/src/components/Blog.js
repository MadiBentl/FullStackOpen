import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisibility] = useState(false)

  const showExtraInfo = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'Hide' : 'Show'

  const toggleButton = () => setVisibility(!visible)
  return(
    <div>
      <div className='mainInfo'>
        {blog.title} {blog.author}
        <button className='show' onClick={toggleButton}>{buttonLabel}</button>
      </div>
      <div style={showExtraInfo} className='extraInfo'>
        <ul>
          <li>{blog.url}</li>
          <li className='likes'>Likes: {blog.likes} <button onClick={() => dispatch(voteBlog(blog))} className='like'>like</button></li>
          {(blog.user && blog.user.username) && <li>User: {blog.user.username} </li>}
          {(blog.user && blog.user.username) &&<li><button onClick={() => dispatch(deleteBlog(blog))}>Delete</button></li>}
        </ul>
      </div>
    </div>
  )
}

export default Blog
