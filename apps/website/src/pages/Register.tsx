import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import '../App.css'
import './styles/Register.css'

import { Paper } from '../components/Paper/Paper'
import { Textbox } from '../components/Textbox/Textbox'
import { Button } from '../components/Button/Button'

import { AppContext } from '../AppContext'
import { handleChangeById as inputHandler, emailValidation } from '../libs/util/inputHandler'

export class Register extends Component {
  state = {
    showLogin: false,
    data: {
      regName: null,
      regEmail: null,
      regPhone: null,
      loginEmail: null,
      loginPw: null
    },
    requiredFulfilled: false,
    fieldsValidated: false,
    required: [
      'regName', 'regEmail', 'regPhone'
    ],
    itratableMembers: []
  }

  handleChangeById = (event:any) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  render() {
    return (
      <article className="register">
        <h2>Register</h2>
        
        <section>
          <h3>Registrations Open</h3>

          <p>
            If you're a student currently studying at JMI, you can register by filling out the form provided at the link below.
            The last date of registration for JMI students is October 05.
          </p>

          <Button onClick={()=>{}} size="medium" color="primary">Register</Button>
          <br/>
          Already Registered? <Link to="#" onClick={()=>{}}>Login</Link>
        </section>

        {/* <section style={{ width: '25em' }}>          
          <Paper>
            {
              this.state.showLogin ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                  <Textbox id="loginEmail" placeholder="Email"
                    onChange={this.handleChangeById}
                    validationErrorHelptext="Not a valid email address"
                    validation={(event:any)=>{
                      return emailValidation(event.target.value)
                    }}
                    onValidate={()=>{
                      this.setState({
                        fieldsValidated: true
                      })
                    }}
                  />

                  <Textbox id="loginPw" placeholder="Passcode"
                    type="password"
                    onChange={this.handleChangeById}
                  />

                  <AppContext.Consumer>
                    {
                      appContext => (
                        <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '24em' }}>
                          <Button color="secondary"
                            onClick={()=>{
                              this.setState({
                                showLogin: false,
                                required: [
                                  'regName', 'regEmail', 'regPhone'
                                ]
                              })
                            }}
                          >
                            Register
                          </Button>

                          <Button color="primary"
                            onClick={()=>{
                              appContext.actions.startAppTransition()
                              setTimeout(()=>{
                                appContext.actions.endAppTransition()
                              }, 5000)
                            }}
                          >
                            Login
                          </Button>
                        </div>
                      )
                    }
                  </AppContext.Consumer>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                  <Textbox id="regName" placeholder="Name" onChange={this.handleChangeById}/>
                  
                  <Textbox id="regEmail" placeholder="Email"
                    onChange={this.handleChangeById}
                    validationErrorHelptext="Not a valid email address"
                    validation={(e:any)=>{
                      return true
                    }}
                    onValidate={()=>{
                      this.setState({
                        fieldsValidated: true
                      })
                    }}
                  />

                  <Textbox id="regPhone" placeholder="Phone" onChange={this.handleChangeById}/>

                  <AppContext.Consumer>
                    {
                      appContext => (
                        <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '24em' }}>
                          <Button color="secondary"
                            onClick={()=>{
                              this.setState({
                                showLogin: true,
                                required: [
                                  'loginEmail', 'loginPw'
                                ]
                              })
                            }}
                          >
                            Login
                          </Button>

                          <Route render={({history})=>{
                            return (
                              <Button color="primary" 
                                onClick={()=>{
                                  appContext.actions.startAppTransition()
                                  history.push('/dashboard')
                                }}
                              >
                                Start
                              </Button>
                            )
                          }}/>
                        </div>                        
                      )
                    }
                  </AppContext.Consumer>
                </div>   
              )
            }
          </Paper>
        </section> */}
      </article>
    )
  }
}

export default Register
