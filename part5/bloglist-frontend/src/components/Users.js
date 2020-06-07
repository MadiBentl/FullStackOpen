import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

const userConfig = {}

const SingleUser = ({ user, num }) => {
  return(
    <TableRow>
      <td><Link to={`/Users/${userConfig[user]}`}>{user}</Link></td>
      <td>{num}</td>
    </TableRow>
  )
}

const UserDashboard = () => {
  const blogs = useSelector(state => state.blogs)
  const userData = {}
  blogs.forEach(blog => {
    if (blog.user && Object.hasOwnProperty.call(userData, blog.user.username)) {
      userData[blog.user.username] += 1
    }else if (blog.user) {
      userData[blog.user.username] = 1
      userConfig[blog.user.username] = blog.user.id
    }
  })
  console.log(userConfig)

  return(
    <TableContainer>
      <h1>Users</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(userData).map(key =>
            <SingleUser key={key} user={key} num={userData[key]} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserDashboard
