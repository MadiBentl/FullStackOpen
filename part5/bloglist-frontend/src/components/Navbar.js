import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core'

const Navbar = () => {
  return(
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
