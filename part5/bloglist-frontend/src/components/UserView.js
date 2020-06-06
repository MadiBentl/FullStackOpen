import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  console.log('id;', id)
  const blogs = useSelector(state => {
    return state.blogs.filter(blog => {
      return (blog.user !== null && blog.user.id === id)
    })
  })
  if(!blogs[0]){
    return null
  }
  return(
    <>
      <h1>{blogs[0].user.username}</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.title}><td>{blog.title}</td><td>{blog.likes}</td></tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default UserView
