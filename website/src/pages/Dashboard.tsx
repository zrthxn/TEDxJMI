import React, { Component } from 'react'
import crypto from 'crypto'
import { Link } from 'react-router-dom'
import '../App.css'

import AppContext from '../AppContext'
import { launchPortal } from '../libs/api/payu'
import { APIService } from '../libs/api/api'
import { decrypt } from '../libs/util/encryption'
import Firestore from '../libs/util/database'
import { Button } from '../components/Button/Button'

export class Dashboard extends Component {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>

  paymentService = new APIService()

  state = {
    transactionCreationSuccessful: false,
    transactionPaymentSuccessful: undefined,
    transaction: {
      txnid: String(),
      baseAmount: Number(),
      discountPercentApplied: Number(),
      taxPercent: Number(),
      amountPaid: Number()
    },
    payment: {
      key: String(),
      salt: String()
    },
    ticketId: null
  }

  componentDidMount() {
    if(this.context.state.userAuthenticated) {
      this.paymentService.createPayment(this.context.state.user).then(({ data })=>{
        const { transaction, apiKey, salt, encoding, checksum } = data
        const hash = crypto.createHash('sha512').update(JSON.stringify(transaction)).digest("base64")

        if(hash===checksum)
          this.setState({
            transaction,
            transactionCreationSuccessful: true,
            payment: {
              key: decrypt(apiKey, encoding),
              salt: decrypt(salt, encoding)
            }
          })
      }).finally(()=>{
        this.context.actions.endAppTransition()
      })
    }
    else
      this.context.actions.router('/register')
  }
  
  /**
   * @lifecycle
   * Lifecycle method 2: start payment, open portal
   */
  onProceedToPay = () => {
    this.context.actions.startAppTransition()
    const { key, salt } = this.state.payment
    const { txnid, amountPaid } = this.state.transaction
    const { name, email, phone } = this.context.state.user
    
    launchPortal({
      key, salt, txnid,
      amount: amountPaid
    }, {
      name, email, phone,
      info: 'TEDxJMI Ticket'
    }, {
      responseHandler: (BOLT:any) => {
        this.onPaymentAuthorize(BOLT.response)
          .then(()=>{
            this.setState({ transactionPaymentSuccessful: true })
          })
          .catch(()=>{
            this.setState({ transactionPaymentSuccessful: false })
          })
          .finally(()=>{
            this.context.actions.endAppTransition()
          })
      },

      catchException: async (BOLT:any) => {
        this.setState({ transactionPaymentSuccessful: false })
        this.context.actions.appState({
          errors: {
            ...BOLT
          }
        })
        await Firestore.collection('Transactions').doc(this.state.transaction.txnid).update({ status: 'FAILED' })
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
      let ticket = await this.paymentService.registerTicket(this.context.state.user, this.state.transaction)
      if(ticket.data.status==='AUTH_PASSED')
        this.setState({
          transactionPaymentSuccessful: true,
          ticketId: ticket.data.ticketId
        })
      else {
        this.context.actions.appState({
          errors: {
            ...ticket.data
          }
        })
        return Promise.reject()
      }
      return
    }
    else {
      this.context.actions.appState({
        errors: {
          ...apiResponse
        }
      })

      this.setState({
        transactionPaymentSuccessful: false
      })
      
      await Firestore.collection('Transactions').doc(this.state.transaction.txnid).update({ status: 'FAILED' })
      return Promise.reject()
    }
  }

  render() {
    if(this.state.transactionCreationSuccessful)
      if(this.state.transactionPaymentSuccessful===true)
        return (
          <article>
            <section className="center">
              <h1>Payment Successful</h1>
              <h3>Thanks for booking your ticket!</h3>
              
              <p style={{ color: '#fff', textAlign: 'center' }}>
                <span style={{ fontWeight: 800, color: '#ff0000' }}>TICKET NUMBER</span><br/>
                <span style={{ fontSize: '1.25em' }}>{ this.state.ticketId }</span><br/>
                <span style={{ color: '#ffffff80' }}>CONFIRMED</span><br/>
              </p>

              <p style={{ textAlign: 'center', margin: '2em 0' }}>
                We have emailed you with all the details. You will need to show the confirmation email 
                we just sent you at the conference venue to get your entry pass. <br/><br/>
                
                We recommend you go through the <Link to="#">guidelines</Link> for the event.<br/>
              </p>

              <p style={{ textAlign: 'center', fontSize: '1.25em' }}>
                <Button size="small" color="primary" onClick={()=>{
                  this.context.actions.router('/')
                }}>Go Home</Button>
              </p>
            </section>
          </article>
        )
      else if(this.state.transactionPaymentSuccessful===false)
        return (
          <article>
            <section className="center">
              <h2>Payment Failed</h2>
              
              <p>
                There was a problem with your payment or you cancelled the payment by clicking 
                the back button. If you think this is an error, please get in touch with us.
              </p>

              <p hidden id="payment-failed-error-details">
                {
                  JSON.stringify(this.context.state.errors)
                }
              </p>

              <p style={{ textAlign: 'center', fontSize: '1.25em' }}>
                <Button size="small" color="primary" onClick={()=>{
                  this.context.actions.router('/')
                }}>Go Home</Button>
              </p>
            </section>
          </article>
        )
      else
        return (
          <article>
            <h1>Payment</h1>

            <section style={{ padding: '1em 3.5em' }}>
              <p style={{ textAlign: 'center', color: '#ffffff80' }}>
                Please note that this ticket is non-refundable and non-transferable.
              </p>
            </section>

            <section className="container">
              <div 
                style={{ 
                  display: 'flex', flexDirection: 'row', 
                  width: '24em', margin: 'auto',
                  fontWeight: 600
                }}
              >
                <p style={{ textAlign: 'left', margin: '0.5em', width: '11.75em' }}>
                  <span>Ticket Price</span><br/><br/>

                  {
                    this.state.transaction.discountPercentApplied!==0 ? (
                      <span><span>Coupon Discount</span><br/><br/></span>
                    ): null
                  }                

                  <span>Tax</span><br/><br/>
                </p>
                
                <p style={{ textAlign: 'right', margin: '0.5em', width: '12.25em' }}>
                  <span>{ '\u20B9' + this.state.transaction.baseAmount }</span><br/><br/>
                  
                  {
                    this.state.transaction.discountPercentApplied!==0 ? (
                      <span><span>{ this.state.transaction.discountPercentApplied + '%' }</span><br/><br/></span>
                    ): null
                  }
                  
                  <span>{ this.state.transaction.taxPercent + '%' }</span><br/><br/>
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: '#dd0000', fontWeight: 800 }}>Total</h3>
                <h2 style={{ marginTop: '0.25em' }}>
                  { '\u20B9 ' + this.state.transaction.amountPaid }
                </h2>
              </div>
            </section>

            <Button size="medium" color="primary" onClick={this.onProceedToPay}>
              Proceed to Pay
            </Button>

            <p style={{ fontSize: '0.75em', textAlign: 'center' }}>
              By registering, you <br/> agree to the <Link to="/terms">Terms and Conditions</Link>
            </p>
          </article>
        )
    else
      return (
        <article>
          <section style={{ textAlign: 'center' }}>
            Loading...
          </section>
        </article>
      )
  }
}

export default Dashboard;
