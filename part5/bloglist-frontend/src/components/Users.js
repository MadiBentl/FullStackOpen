import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const userConfig = {}

const SingleUser = ({ user, num }) => {
  return(
    <tr>
      <td><Link to={`/Users/${userConfig[user]}`}>{user}</Link></td>
      <td>{num}</td>
    </tr>
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
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(userData).map(key =>
            <SingleUser key={key} user={key} num={userData[key]} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserDashboard
