import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleSubmit = (event) => {
    event.preventDefault(event)
    handleNewBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return(
    <>
      <h2>Add a new blog</h2>
      <form onSubmit = {handleSubmit}>
        <div>
          Title
          <input
            name='title'
            value={newBlog.title}
            type='text'
            onChange={({ target }) => setNewBlog({ ...newBlog, title:target.value })}
          />
        </div>
        <div>
          Author
          <input
            name='author'
            value={newBlog.author}
            type='text'
            onChange={({ target }) => setNewBlog({ ...newBlog, author:target.value })}
          />
        </div>
        <div>
          Url
          <input
            name='url'
            value={newBlog.url}
            type='text'
            onChange={({ target }) => setNewBlog({ ...newBlog, url:target.value })}
          />
        </div>
        <button type='submit'>Add</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired
}

export default BlogForm
