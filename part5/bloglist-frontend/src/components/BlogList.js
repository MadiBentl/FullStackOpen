import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  console.log('blogs', blogs)
  return(
    <div>
      <h2>Blog Articles</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={null} deleteBlog={null}/>
      )}
    </div>
  )
}

export default BlogList
