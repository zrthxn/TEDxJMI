import React, { Component } from 'react'
import { AppContext } from './AppContext'

export default class AppContextProvider extends Component {
  state = {
    ongoingAppTransition: false
  }

  startAppTransition = () => {
    this.setState(()=>{
      return {
        ongoingAppTransition: true
      }
    })
  }

  endAppTransition = () => {
    this.setState(()=>{
      return {
        ongoingAppTransition: false
      }
    })
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          actions: {
            startAppTransition: this.startAppTransition,
            endAppTransition: this.endAppTransition
          }
        }}
      >
        {
          this.props.children
        }
      </AppContext.Provider>
    )
  }
}
