import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './App.css'

import Home from './pages/Home'
import Speakers from './pages/Speakers'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Register from './pages/Register'

export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Link to={'/'}>Home</Link>
          <Link to={'/team'}>Team</Link>
          <Link to={'/speakers'}>Speakers</Link>
          <Link to={'/contact'}>Contact</Link>
          <Link to={'/register'}>Register</Link>

          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/team" component={Team}/>
            <Route path="/speakers" component={Speakers}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/register" component={Register}/>
            
            <Route component={Home}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
