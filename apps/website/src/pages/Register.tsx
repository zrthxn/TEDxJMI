import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import '../App.css'
import './styles/Register.css'

import { AppContext } from '../AppContext'
import { handleChangeById as inputHandler, emailValidation } from '../libs/util/inputHandler'
import Firestore from '../libs/util/database'
import { APIService } from '../libs/api/api'

import { Paper } from '../components/Paper/Paper'
import { Textbox } from '../components/Textbox/Textbox'
import { Button } from '../components/Button/Button'
import { Checkbox } from '../components/Checkbox/Checkbox'

import Dashboard from './Dashboard'

export class Register extends Component {
  static contextType = AppContext
  context!: React.ContextType<typeof AppContext>

  authService = new APIService()

  state = {
    authenticated: false,
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
      this.setState({
        authenticated: true
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

        <section>
          {
            this.state.authenticated ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                {
                  this.state.loggedIn ? (
                    <div>
                      <h2 style={{ margin: '0 1rem' }}>{ this.state.data.name }</h2>
                      <h3 style={{ color: '#ffffff80' }}>{ this.state.data.email }</h3>
                      <section style={{ maxWidth: '28em' }}>
                        <Textbox id="phone" placeholder="Phone" className="dark" 
                          value={this.state.data.phone} onChange={this.handleChangeById}/>

                        <Textbox id="institution" placeholder="Institution" className="dark"
                          value={this.state.data.institution} onChange={this.handleChangeById}/>

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

                        <Textbox id="couponCode" placeholder="Coupon Code" className="dark"
                          value={this.state.data.couponCode} onChange={this.handleChangeById}/>

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

                      <p style={{ textAlign: 'center' }}>
                        Fill in the following form to register for TEDxJMI 2019.
                        Please read the terms and conditions carefully before registering.
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
                            <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '24em', margin: '2em auto' }}>                                  
                              <Button color="primary"
                                onClick={() => {
                                  this.setState({
                                    loggedIn: true
                                  })
                                }}
                              >
                                Start
                              </Button>
                            </div>
                          )
                        }
                      </AppContext.Consumer>
                    </div>
                  )
                }
              </div>             
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
