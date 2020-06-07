import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

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
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Likes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map(blog =>
            <TableRow key={blog.title}><TableCell>{blog.title}</TableCell><TableCell>{blog.likes}</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default UserView
