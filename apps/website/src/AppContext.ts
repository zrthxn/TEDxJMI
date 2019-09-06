import React from 'react'
import { UserModel, TicketModel } from './Models'

export const AppContext = React.createContext({
  state: {
    ongoingAppTransition: false,
    user: {
      _id: String(),
      name: String(),
      email: String(),
      phone: String(),
      institution: String(),
      createdOn: String(),
      isInternalStudent: Boolean(),
      studentIdNumber: String()
    },
    ticket: {
      _id: String(),
      userId: String(),
      createdOn: String(),
      couponCode: String(),
      verified: Boolean(),
      paymentId: String(),
      payment: {    
        txnid: String(),
        baseAmount: Number(),
        discountPercentApplied: Number(),
        taxPercent: Number(),
        amountPaid: Number(),
      }
    }
  },
  actions: {
    router: (path:string) => {

    },
    startAppTransition: () => {

    },
    endAppTransition: () => {
      
    },
    setUser: (user:UserModel|any) => {
      
    },
    setTicket: (ticket:TicketModel|any) => {

    }
  }
})

export default AppContext