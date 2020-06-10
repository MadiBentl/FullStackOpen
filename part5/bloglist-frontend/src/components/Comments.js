import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { getComments } from '../reducers/commentsReducer'


const Comments = (props) => {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments)
  console.log('comments', comments)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const fetchComments = async () => {
      return await dispatch(getComments(props.blog))
    }
    fetchComments()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment(props.blog, comment))
    setComment('')
  }

  return(
    <div>
      <form onSubmit = {handleSubmit}>
        <input
          name='comment'
          value={comment}
          onChange={({ target }) => setComment(target.value )}
        />
        <button type='submit'>Button</button>
      </form>
      <h1>Comments</h1>
      <ul>
        {comments.map(comment => {
          return <li key= {comment.id}>{comment.content}</li>
        })}
      </ul>
    </div>
  )
}

export default Comments
