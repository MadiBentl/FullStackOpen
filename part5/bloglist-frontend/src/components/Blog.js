import React, {useState} from 'react';
import blogService from '../services/blogs'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [visible, setVisibility] = useState(false)

  const showExtraInfo = {display: visible ? '' : 'none'}
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
        {(blog.user) && <li>{blog.user.username} </li>}
        <li><button onClick={() => deleteBlog(blog)}>Delete</button></li>
        </ul>
      </div>
    </div>
  )
}

export default Blog
