import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { List } from '@material-ui/core'


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return(
    <List component='div'>
      <h2>Blog Articles</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </List>
  )
}

export default BlogList
