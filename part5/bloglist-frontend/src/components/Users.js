import React from 'react'
import { useSelector } from 'react-redux'

const UserDashboard = () => {
  const blogs = useSelector(state => state.blogs)
  const userData = {}
  console.log(blogs, userData)
  return(
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default UserDashboard
