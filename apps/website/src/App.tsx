import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Speakers from './pages/Speakers'
import Team from './pages/Team'
import Terms from './pages/Terms'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import { Loading } from './components/Loading/Loading'
import { Title } from './components/Title/Title'

import AppContextProvider from './AppContextProvider'
import AppContext from './AppContext'

import { APIService } from './libs/api/api'

export class App extends Component {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>

  state = {
    authenticated: true,
    sidebar: {
      isOpen: false
    }
  }
  
  toggleSidebar = () => {
    this.setState(()=>{
      let { sidebar } = this.state
      sidebar.isOpen = !sidebar.isOpen
      return {
        sidebar
      }
    })
  }

  render() {
    return (
      <Router>
        <article>
          <AppContextProvider>
            
          <header>
            <div className="container">
              <div className="logo">
                <Title/>
              </div>
              
              <input type="checkbox" checked={this.state.sidebar.isOpen} id="sidebar-toggle" hidden readOnly/>
              <label htmlFor="sidebar-toggle" className="hamburger" onClick={this.toggleSidebar}><span></span></label>
              
              <div className="sidebar">
                <nav className="sidebar-nav">
                  <Link onClick={this.toggleSidebar} to={'/'}>About</Link>
                  <Link onClick={this.toggleSidebar} to={'/speakers'}>Speakers</Link>
                  <Link onClick={this.toggleSidebar} to={'/team'}>Team</Link>
                  <Link onClick={this.toggleSidebar} to={'/contact'}>Contact</Link>
                  <Link onClick={this.toggleSidebar} to={'/register'}>Register</Link>
                </nav>
              </div>

              <div className="sidebar-shadow" id="sidebar-shadow" onClick={this.toggleSidebar}/>
              
              <nav className="desktop-nav">
                <Link to={'/'}>About</Link>
                <Link to={'/speakers'}>Speakers</Link>
                <Link to={'/team'}>Team</Link>
                <Link to={'/contact'}>Contact</Link>
                <Link to={'/register'}>Register</Link>
              </nav>
            </div>
          </header>

            <AppContext.Consumer>
              {
                appContext => (
                  <div>
                    {
                      appContext.state.ongoingAppTransition ? <Loading/> : null
                    }
                  </div>
                )
              }
            </AppContext.Consumer>

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/team" component={Team}/>
              <Route path="/speakers" component={Speakers}/>
              <Route path="/contact" component={Contact}/>
              <Route path="/donate" component={Contact}/>
              <Route path="/register" component={Register}/>
              <Route path="/terms" component={Terms}/>
              <Route path="/dashboard" component={Dashboard}/>
              
              <Route component={Home}/>
            </Switch>
            
            <footer>
              <div className="social">
                <a href="https://facebook.com/tedxjmi">
                  <img src="/assets/img/icons/fb.png" width="25px" alt=""/>
                </a>
                <a href="https://instagram.com/tedxjmi">
                  <img src="/assets/img/icons/insta.png" width="25px" alt=""/>
                </a>
                <h3>Social Links</h3>
              </div>

              <b>TEDxJMI 2019 Official Website</b> <br/>
              Operating under license from TED<sup>&trade;</sup>
              <br/><br/>
              <Link to={'/terms'}>Terms and Conditions</Link>
            </footer>
          </AppContextProvider>
        </article>
      </Router>      
    )
  }
}

export default App
