import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const Comments = (props) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

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
    </div>
  )
}

export default Comments
