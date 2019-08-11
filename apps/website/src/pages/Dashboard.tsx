import React, { Component } from 'react'
import { withRouter, Route } from 'react-router-dom'
import { RegistrationService } from '../libs/api/register'
import { LoginService } from '../libs/api/login'

import '../App.css'

import { AppContext } from '../AppContext'
import AppContextProvider from '../AppContextProvider';

export class Dashboard extends Component {
  static contextType = AppContext

  state = {

  }

  constructor(props:any, context:AppContextProvider) {
    super(props, context)
  }

  redirect({ history }:any) {
    history.push('/register')
    return (
      <div></div>
    )
  }

  componentDidMount() {
    if(true)
      withRouter(this.redirect)

    setTimeout(this.context.actions.endAppTransition, 5000)
    this.setState(()=>{
      const { userData } = this.context.state
      return {

      }
    })
  }

  render() {
    return (
      <article>
        <h2>Dashboard</h2>

        {/* <Route render={({ history}) => (
          <button
            type='button'
            onClick={() => {  }}
          >
            
          </button>
        )} /> */}
      </article>
    )
  }
}

export default Dashboard
