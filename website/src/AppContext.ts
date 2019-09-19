import React from 'react'

export const AppContext = React.createContext({
  state: {
    ongoingAppTransition: false,
    userAuthenticated: true,
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
  },
  actions: {
    appState: (setter:any) => {
      
    },
    router: (path:string) => {

    },
    startAppTransition: () => {

    },
    endAppTransition: () => {
      
    }
  }
})

export default AppContext