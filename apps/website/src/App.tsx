import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './App.css'

import Home from './pages/Home'
import Speakers from './pages/Speakers'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

import Loading from './components/Loading/Loading'
import Header from './components/Partials/Header/Header'
import Footer from './components/Partials/Footer/Footer'

import AppContextProvider from './AppContextProvider'
import { AppContext } from './AppContext'

export class App extends Component {
  render() {
    return (
      <AppContextProvider>
        <article>
          <Router>
            <Header/>

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

            <section>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/team" component={Team}/>
                <Route path="/speakers" component={Speakers}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/register" component={Register}/>
                
                <Route path="/dashboard" component={Dashboard}/>
                
                <Route component={Home}/>
              </Switch>
            </section>
            
            <Footer/>
          </Router>
        </article>
      </AppContextProvider>      
    )
  }
}

export default App
