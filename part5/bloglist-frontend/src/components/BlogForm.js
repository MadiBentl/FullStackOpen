import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleSubmit = (event) => {
    event.preventDefault(event)
    dispatch(addBlog(newBlog))
    setNewBlog({ title: '', author: '', url: '' })
  }

  return(
    <>
      <h2>Add a new blog</h2>
      <form onSubmit = {handleSubmit}>
        <div>
          Title
          <input
            id='title'
            name='title'
            value={newBlog.title}
            type='text'
            onChange={({ target }) => setNewBlog({ ...newBlog, title:target.value })}
          />
        </div>
        <div>
          Author
          <input
            id='author'
            name='author'
            value={newBlog.author}
            type='text'
            onChange={({ target }) => setNewBlog({ ...newBlog, author:target.value })}
          />
        </div>
        <div>
          Url
          <input
            id='url'
            name='url'
            value={newBlog.url}
            type='text'
            onChange={({ target }) => setNewBlog({ ...newBlog, url:target.value })}
          />
        </div>
        <button id='add_blog' type='submit'>Add</button>
      </form>
    </>
  )
}

export default BlogForm
