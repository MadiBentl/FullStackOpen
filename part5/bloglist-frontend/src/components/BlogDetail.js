import React from 'react'
import { Button, List, ListItem } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { voteBlog, deleteBlog } from '../reducers/blogReducer'
import Comments from './Comments'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const user = useSelector(state => state.login.user)
  const blog = useSelector(state => {
    return state.blogs.filter(blog => {
      return blog.id === id
    })
  })
  if (!blog[0]){
    return null
  }

  const onBlogDelete = () => {
    dispatch(deleteBlog(blog[0]))
    history.push('/')
  }

  return(
    <>
      <List component="div">
        <h1>{blog[0].title} - {blog[0].author}</h1>
        <ListItem>Added by {blog[0].user !== null ? blog[0].user.username : 'anonymous'}</ListItem>
        <ListItem>URL: {blog[0].url}</ListItem>
        <ListItem> {blog[0].likes} likes </ListItem>
        <Button color='primary' onClick={() => dispatch(voteBlog(blog[0]))}>Like</Button>
        {blog[0].user !== null && user === blog[0].user.username && <Button color='secondary' onClick={() => onBlogDelete()}>delete</Button>}
      </List>
      <Comments blog={blog[0]}/>
    </>
  )
}

export default BlogDetail
