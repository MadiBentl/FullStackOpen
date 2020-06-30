import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

  const padding = { padding: 5 }

  return(
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path = '/notes'>
          <p>notes</p>
        </Route>
        <Route path = '/users'>
          <p>user</p>
        </Route>
        <Route path = '/'>
          <p>home</p>
        </Route>
      </Switch>

      <div>
        <i>Note app. Copyright blah blah </i>
      </div>
    </Router>
  )
}

export default App
