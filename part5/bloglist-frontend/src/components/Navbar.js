import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const Navbar = () => {
  return(
    <div>
      <Link to="/">Home</Link>
      <Link to='/Users'>Users</Link>
      <LogoutButton />
    </div>
  )
}

export default Navbar
