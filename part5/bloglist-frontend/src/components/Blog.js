import React, { useState } from 'react'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
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
          <li className='likes'>Likes: {blog.likes} <button onClick={() => likeBlog(blog)} className='like'>like</button></li>
          {(blog.user && blog.user.username) && <li>{blog.user.username} </li>}
          {(user && blog.user && blog.user.username === user.username) &&<li><button onClick={() => deleteBlog(blog)}>Delete</button></li>}
        </ul>
      </div>
    </div>
  )
}

export default Blog
