import React from 'react'
import { Link } from 'react-router-dom'
import { ListItem, ListItemText } from '@material-ui/core'

const Blog = ({ blog }) => {
  return(
    <ListItem>
      <div className='mainInfo'>
        <Link to={`/${blog.id}`}>
          <ListItemText primary={`${blog.title} ${blog.author}`}/>
        </Link>
      </div>
    </ListItem>
  )
}

export default Blog
