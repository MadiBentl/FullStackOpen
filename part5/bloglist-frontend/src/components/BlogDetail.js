import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { voteBlog } from '../reducers/blogReducer'

const BlogDetail = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => {
    return state.blogs.filter(blog => {
      return blog.id === id
    })
  })
  if (!blog[0]){
    return null
  }
  return(
    <div>
      <h1>{blog[0].title} - {blog[0].author}</h1>
      <p>Added by {blog[0].user.username || blog[0].user}</p>
      <p>URL: {blog[0].url}</p>
      <p> {blog[0].likes} likes </p>
      <button onClick={() => dispatch(voteBlog(blog[0]))}>Like</button>
    </div>
  )
}

export default BlogDetail
