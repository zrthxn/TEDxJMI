import React from 'react'

export const AppContext = React.createContext({
  state: {
    ongoingAppTransition: false
  },
  actions: {
    startAppTransition: () => {},
    endAppTransition: () => {}
  }
})