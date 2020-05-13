import React, {useState} from 'react'

const Blog = ({ blog }) => {
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
        {blog.url}
        {blog.likes}
        {blog.username}
      </div>
    </div>
  )
}

export default Blog
