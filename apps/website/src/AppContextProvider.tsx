import React, { Component } from 'react'
import { AppContext } from './AppContext'
import { Route } from 'react-router-dom'

export default class AppContextProvider extends Component {
  state = {
    ongoingAppTransition: false,
    userAuthenticated: false,
    user: {
      name: String(),
      email: String(),
      phone: String(),
      institution: String(),
      createdOn: Date(),
      isInternalStudent: Boolean(),
      studentIdNumber: String(),
      couponCode: String()
    },
    errors: {

    }
  }

  appState = (setter:{} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, never> | null) |  Pick<{}, never> | null, 
      callback?: (() => void) | undefined) => {
    this.setState(setter, callback)
  }

  startAppTransition = () => {
    this.setState(()=>{
      return {
        ongoingAppTransition: true
      }
    })
  }

  endAppTransition = () => {
    setTimeout(()=>{
      this.setState(()=>{
        return {
          ongoingAppTransition: false
        }
      })
    }, 1000)
  }

  render() {
    return (
      <Route render={({ history })=>(
        <AppContext.Provider
          value={{
            state: this.state,
            actions: {
              startAppTransition: this.startAppTransition,
              endAppTransition: this.endAppTransition,
              appState: this.appState,
              router: (path)=>{
                history.push(path)
              }
            }
          }}
        >
          {
            this.props.children
          }
        </AppContext.Provider>
      )}/>
    )
  }
}
