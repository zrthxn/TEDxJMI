import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import './styles/Register.css'

import { AppContext } from '../AppContext'
import { handleChangeById as inputHandler, emailValidation } from '../libs/util/inputHandler'
import { APIService } from '../libs/api/api'
import Firestore from '../libs/util/database'

import { Textbox } from '../components/Textbox/Textbox'
import { Button } from '../components/Button/Button'
import { Checkbox } from '../components/Checkbox/Checkbox'

export class Register extends Component {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>

  authService = new APIService()

  state = {
    authenticated: false,
    registrationsOpen: false,
    loggedIn: false,
    data: {
      name: String(),
      email: String(),
      phone: String(),
      institution: String(),
      createdOn: Date(),
      isInternalStudent: Boolean(),
      studentIdNumber: String(),
      couponCode: String(),
    },
    requiredFulfilled: false,
    fieldsValidated: false,
    required: [
      'regName', 'regEmail'
    ],
    iterableMembers: []
  }

  componentDidMount() {
    this.authService.authenticate().then(()=>{
      Firestore.collection('Tickets').get().then((ticketQuery)=>{
        if(process.env.REACT_APP_MAX_REGISTRATIONS!==undefined)    
          if(ticketQuery.docs.length < parseInt(process.env.REACT_APP_MAX_REGISTRATIONS, 10) && 
            process.env.REACT_APP_REGISTRATION_OPEN==='YES') {
            this.setState({ 
              registrationsOpen: true, 
              authenticated: true 
            })
          }
          else {
            this.setState({ authenticated: true })
            this.authService.sendAutoCloseNotification({
              regNumber: ticketQuery.docs.length
            })
          }
      })
    })
  }
  
  handleChangeById = (event: any) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props) => (
      result
    ))
  }

  register = async () => {
    if(this.state.requiredFulfilled) {
      localStorage.setItem('tedxjmi:user-data-dump', JSON.stringify(this.state.data))
      this.context.actions.appState({
        user: this.state.data,
        userAuthenticated: true
      })
      return
    }
    else
      return Promise.reject('Please fill in the required fields')
  }

  render() {
    return (
      <article className="register">
        <h1>Register</h1>

        <section className="center">
          {
            this.state.authenticated ? (
              this.state.registrationsOpen ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                  {
                    this.state.loggedIn ? (
                      <div>
                        <h3>{ this.state.data.name }</h3>
                        <p style={{ textAlign: 'center', opacity: 0.5 }}>
                          { this.state.data.email }
                        </p>

                        <section style={{ maxWidth: '28em', padding: '0 1em' }}>
                          <Textbox id="phone" placeholder="Phone" className="dark" 
                            value={this.state.data.phone} onChange={this.handleChangeById}/>

                          <Textbox id="institution" placeholder="Institution" className="dark"
                            value={this.state.data.institution} onChange={this.handleChangeById}/>
                      
                          <Textbox id="couponCode" placeholder="Coupon Code (Optional)" className="dark"
                            value={this.state.data.couponCode} onChange={this.handleChangeById}/>

                          {/* <Checkbox label="Attended a TEDx Event before?"
                            onChange={(target: { checked:boolean })=>{
                              this.setState(()=>{
                                let { data } = this.state
                                data.isInternalStudent = target.checked
                                return {
                                  data
                                }
                              })
                            }}
                          /> */}

                          <Checkbox label="JMI Student" checked={this.state.data.isInternalStudent} 
                            onChange={(target: { checked:boolean })=>{
                              this.setState(()=>{
                                let { data } = this.state
                                data.isInternalStudent = target.checked
                                return {
                                  data
                                }
                              })
                            }}
                          />

                          {
                            this.state.data.isInternalStudent ? (
                              <Textbox id="studentIdNumber" placeholder="JMI ID Number" className="dark"
                                value={this.state.data.studentIdNumber} onChange={this.handleChangeById}/>
                            ) : null
                          }

                          <Button size="medium" color="primary" onClick={()=>{
                            this.context.actions.startAppTransition()
                            this.register()
                              .then(()=>{
                                this.context.actions.router('/dashboard')
                              })
                              .catch((err)=>{
                                alert(err)
                              })
                          }}>
                            Proceed
                          </Button>
                          <p style={{ fontSize: '0.75em', textAlign: 'center' }}>
                            By registering, you <br/> agree to the <Link to="/terms">Terms and Conditions</Link>
                          </p>
                        </section>
                      </div>
                    ) : (
                      <div>
                        <h3>Registrations Open</h3>

                        <p style={{ textAlign: 'center', opacity: 0.5 }}>
                          Fill in this form to book your tickets
                        </p>

                        <Textbox id="name" className="dark" placeholder="Name" onChange={this.handleChangeById} />

                        <Textbox id="email" className="dark" placeholder="Email"
                          onChange={this.handleChangeById}
                          validationErrorHelptext="Not a valid email address"
                          validation={(e: any) => {
                            return emailValidation(e.target.value)
                          }}
                          onValidate={() => {
                            this.setState({
                              fieldsValidated: true
                            })
                          }}
                        />

                        <AppContext.Consumer>
                          {
                            appContext => (
                              <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '24em', margin: '2em auto' }}>                                  
                                <Button color="primary"
                                  onClick={() => {
                                    if(this.state.data.email!==String() && this.state.fieldsValidated)
                                      this.setState({
                                        loggedIn: true
                                      })
                                    else
                                      alert('Please fill in your details')
                                  }}
                                >
                                  Start
                                </Button>

                                <p style={{ fontSize: '0.75em', textAlign: 'center', margin: '2em 0' }}>
                                  By registering, you <br/> agree to the <Link to="/terms">Terms and Conditions</Link>
                                </p>
                              </div>
                            )
                          }
                        </AppContext.Consumer>
                      </div>
                    )
                  }
                </div>             
              ) : (
                <div>
                  <h3>Registrations Closed</h3>
                  <p style={{ textAlign: 'center' }}>
                    Registrations are currently closed. <br/>
                    Please check back on a later date.
                  </p>
                </div>
              )
            ) : (
              <section className="center">
                <h3>Loading</h3>
              </section>
            )
          }
        </section>
      </article>
    )
  }
}
export default Register
