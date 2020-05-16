import React, { useState } from 'react'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [visible, setVisibility] = useState(false)

  const showExtraInfo = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'Hide' : 'Show'

  const toggleButton = () => setVisibility(!visible)
  return(
    <div>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleButton}>{buttonLabel}</button>
      </div>
      <div style={showExtraInfo}>
        <ul>
          <li>{blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></li>
          {(blog.user && blog.user.username) && <li>{blog.user.username} </li>}
          {(user && blog.user && blog.user.username === user.username) &&<li><button onClick={() => deleteBlog(blog)}>Delete</button></li>}
        </ul>
      </div>
    </div>
  )
}

export default Blog
