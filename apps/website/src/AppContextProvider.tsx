import React, { Component } from 'react'
import { AppContext } from './AppContext'
import { Route } from 'react-router'
import { UserModel, TicketModel } from './Models'

export default class AppContextProvider extends Component {
  state = {
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
    },

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

  loginUser = (user:UserModel, ticket?:TicketModel) => {
    this.setState({
      user,
      ticket
    })
  }

  registerTicket = (user:UserModel, ticket?:TicketModel) => {
    this.setState({
      user,
      ticket
    })
  }

  render() {
    return (
      <Route render={({ history })=>{
          return (
            <AppContext.Provider
              value={{
                state: this.state,
                actions: {
                  startAppTransition: this.startAppTransition,
                  endAppTransition: this.endAppTransition,
                  loginUser: this.loginUser,
                  registerTicket: this.registerTicket,
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
          )
        }}
      />
    )
  }
}
