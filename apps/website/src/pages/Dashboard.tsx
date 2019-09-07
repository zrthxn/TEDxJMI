import React, { Component } from 'react'
import $ from 'jquery'
import { withRouter, Route, Link } from 'react-router-dom'
import '../App.css'

import AppContext from '../AppContext'
import { UserModel, TicketModel } from '../Models'
import { handleChangeById as inputHandler, handleChangeById } from '../libs/util/inputHandler'
import { launchPortal } from '../libs/api/payu'
import { APIService } from '../libs/api/api'

import { Ticket } from '../components/Ticket/Ticket'
import { Textbox } from '../components/Textbox/Textbox'
import { Checkbox } from '../components/Checkbox/Checkbox'
import { Button } from '../components/Button/Button'
import { Loading } from '../components/Loading/Loading'

import Confirmation from '../components/Payments/Confirmation'
import Failure from '../components/Payments/Failure'

interface DashboardProps {
  intent: 'register' | 'login' | 'payment'
  user: UserModel | any
  ticket?: TicketModel | any
}

export class Dashboard extends Component<DashboardProps> {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>

  paymentService = new APIService()

  state = {
    intent: null,
    data: {
      user: {
        name: String(),
        email: String(),
        phone: String(),
        institution: String(),
        createdOn: Date(),
        isInternalStudent: Boolean(),
        studentIdNumber: String()
      },
      ticket: {
        userEmail: String(),
        createdOn: String(),
        couponCode: String(),
        verified: Boolean(),
        paymentId: String(),
        payment: {    
          txnid: String(),
          baseAmount: Number(),
          discountPercentApplied: Number(),
          taxPercent: Number(),
          amountPaid: Number()
        }
      }
    },
    requiredFulfilled: false,
    fieldsValidated: false,
    required: [
      'phone'
    ],
    iterableMembers: [

    ],
    payment: {
      key: String(),
      salt: String()
    }
  }

  bolt = null

  constructor(props:any) {
    super(props)
  }

  componentDidMount() {
    let { data } = this.state
    this.setState(()=>{
      data.user = this.props.user

      if(this.props.ticket!==undefined)
        data.ticket = this.props.ticket

      this.context.actions.endAppTransition()
      return {
        intent: this.props.intent,
        data
      }
    })
  }

  handleChangeById = (event:any) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  /**
   * @lifecycle
   * Lifecycle method 1: finalize user data
   */
  onFinalize = async () => {
    if(this.state.requiredFulfilled) {
      this.context.actions.startAppTransition()

      let payment = await this.paymentService.createPayment(this.state.data)
      
      let { data } = this.state
      data.ticket.payment = payment.data.transaction
      this.context.actions.setUser(data.user)

      this.setState({
        intent: 'payment',
        data,
        payment: {
          key: payment.data.apiKey,
          salt: payment.data.salt
        }
      })
      return
    }
    else {
      alert('Please fill all the required fields!')
      return Promise.reject()
    }
  }

  /**
   * @lifecycle
   * Lifecycle method 2: start payment, open portal
   */
  payment = async () => {
    this.context.actions.startAppTransition()
    launchPortal({
      key: this.state.payment.key,
      salt: this.state.payment.salt,
      txnid: this.state.data.ticket.payment.txnid,
      amount: this.state.data.ticket.payment.amountPaid
    }, {
      name: this.state.data.user.name,
      email: this.state.data.user.email,
      phone: this.state.data.user.phone,
      info: 'TEDXJMI Ticket'
    }, {
      responseHandler: (BOLT:any) => {
        this.onPaymentAuthorize(BOLT.response)
          .then(()=>{
            this.context.actions.router('/payment/success')
          })
          .catch(()=>{
            this.context.actions.router('/payment/failure')
          })
          .finally(()=>{
            this.context.actions.endAppTransition()
          })
      },

      catchException: (BOLT:any) => {
        this.context.actions.router('/payment/failure')
        this.context.actions.endAppTransition()
      }
    })
  }

  /**
   * @lifecycle
   * Lifecycle method 3: payment completed
   */
  onPaymentAuthorize = async (apiResponse:any) => {
    if(apiResponse.txnStatus==='SUCCESS') {
      let ticket = await this.paymentService.registerTicket(this.state.data)
      
      let { data } = this.state

      this.context.actions.setTicket(data.ticket)
      return
    }
    else {
      return Promise.reject()
    }
  }

  /**
   * @lifecycle
   * Lifecycle method 4: payment refund
   */
  refundPayment = async () => {
    this.context.actions.startAppTransition()
    
    // let refund = await this.paymentService.refundPayment()
    // wait for API response
    setTimeout(this.context.actions.endAppTransition, 1000)
  }

  render() {
    const { intent } = this.state

    if(intent==="login")
      return (
        <article>
          <section>
            
          </section>
        </article>
      )

    else if(intent==="register")
      return (
        <article>
          <h1>Dashboard</h1>

          <section className="center">
            In the section below, please select your ticket and go through the guidelines carefully.
          </section>

          <section className="center" style={{ maxWidth: '28em' }}>
            <h2 style={{ margin: '0 1rem' }}>{ this.props.user.name }</h2>
            <h3 style={{ color: '#ffffff80' }}>{ this.props.user.email }</h3>
            
            <Textbox id="user/phone" placeholder="Phone" className="dark" 
              value={this.state.data.user.phone} onChange={this.handleChangeById}/>

            <Textbox id="user/institution" placeholder="Institution" className="dark"
              value={this.state.data.user.institution} onChange={this.handleChangeById}/>

            <Checkbox label="JMI Student" checked={this.state.data.user.isInternalStudent} 
              onChange={(target: { checked:boolean })=>{
                this.setState(()=>{
                  let { data } = this.state
                  data.user.isInternalStudent = target.checked
                  return {
                    data
                  }
                })
              }}
            />

            {
              this.state.data.user.isInternalStudent ? (
                <Textbox id="user/studentIdNumber" placeholder="JMI ID Number" className="dark"
                  value={this.state.data.user.studentIdNumber} onChange={this.handleChangeById}/>
              ) : null
            }

            <Textbox id="ticket/couponCode" placeholder="Coupon Code" className="dark"
              value={this.state.data.ticket.couponCode} onChange={this.handleChangeById}/>

            <Button size="medium" color="primary" onClick={()=>{
              this.onFinalize().then(()=>{
                this.context.actions.endAppTransition()
              }).catch(()=>{
                this.context.actions.endAppTransition()
              })
            }}>
              Proceed
            </Button>
            <p style={{ fontSize: '0.75em', textAlign: 'center' }}>
              By registering, you <br/> agree to the <Link to="/terms">Terms and Conditions</Link>
            </p>
          </section>
        </article>
      )

    else if(intent==="payment")
      return (
        <article>
          <h2>Payment</h2>

          <section>
            <h3>
              { '\u20B9' + this.state.data.ticket.payment.amountPaid }
            </h3>
          </section>

          <Link to="#" style={{ fontSize: '1.25em' }} onClick={()=>(
            this.setState({
              intent: 'register'
            })
          )}>
            Go Back
          </Link>

          <br/>

          <Button size="medium" color="primary" onClick={()=>{
            this.payment()
          }}>
            Proceed to Pay
          </Button>
          <p style={{ fontSize: '0.75em', textAlign: 'center' }}>
            By registering, you <br/> agree to the <Link to="/terms">Terms and Conditions</Link>
          </p>
        </article>
      )

    else
      return (
        <Loading/>
      )
  }
}

export default Dashboard;
