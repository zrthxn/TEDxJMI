import React, { Component } from 'react'

import Login from './Login'
import Seating from './Seating'

export default class App extends Component {
  state = {
    isAuthorized: true //false
  }

  render() {
    return (
      <div>
        {
          this.state.isAuthorized ? (
            <Seating/>
          ) : (
            <Login
              onAuth={()=>{
                this.setState({
                  isAuthorized: true
                })
              }}
            />
          )
        }
      </div>
    )
  }
}
