import React from 'react'

export const AppContext = React.createContext({
  state: {
    ongoingAppTransition: false,
    userdata: {
      _id: 'null',
      name: 'Ali',
      email: 'zrthxn'
    }
  },
  actions: {
    startAppTransition: () => {

    },
    endAppTransition: () => {
      
    }
  }
})

export default AppContext