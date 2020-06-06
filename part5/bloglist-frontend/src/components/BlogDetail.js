import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'

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
    <div>
      <h1>{blog[0].title} - {blog[0].author}</h1>
      <p>Added by {blog[0].user !== null ? blog[0].user.username : 'anonymous'}</p>
      <p>URL: {blog[0].url}</p>
      <p> {blog[0].likes} likes </p>
      <button onClick={() => dispatch(voteBlog(blog[0]))}>Like</button>
      {blog[0].user !== null && user === blog[0].user.username && <button onClick={() => onBlogDelete()}>delete</button>}
    </div>
  )
}

export default BlogDetail
