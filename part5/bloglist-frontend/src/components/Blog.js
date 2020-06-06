import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return(
    <div>
      <div className='mainInfo'>
        <Link to={`/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

export default Blog
