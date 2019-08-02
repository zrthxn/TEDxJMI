import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import '../App.css'
import './styles/Register.css'

import { Paper } from '../components/Paper/Paper'
import { Textbox } from '../components/Textbox/Textbox'
import { Button } from '../components/Button/Button'

import { AppContext } from '../AppContext'
import { handleChangeById as inputHandler } from '../libs/util/inputHandler'

export class Register extends Component {
  state = {
    showLogin: false,
    data: {
      name: null,
      email: null,
      phone: null
    },
    requiredFulfilled: false,
    fieldsValidated: false,
    required: [
      'name', 'email', 'phone'
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
      <article
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center'
        }}
      >
        <h2>Register</h2>

        <section
          style={{
            width: '24em',
            margin: 'auto'
          }}
        >
          <Paper>
            {
              this.state.showLogin ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center'
                  }}
                >
                  <Textbox id="email" placeholder="Email"
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

                  <AppContext.Consumer>
                    {
                      appContext => (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row'
                          }}
                        >
                          <Button style="secondary"
                            onClick={()=>{
                              this.setState({
                                showLogin: false
                              })
                            }}
                          >
                            Register
                          </Button>

                          <Button style="primary"
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center'
                  }}
                >
                  <Textbox id="name" placeholder="Name" onChange={this.handleChangeById}/>
                  
                  <Textbox id="email" placeholder="Email"
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

                  <Textbox id="phone" placeholder="Phone" onChange={this.handleChangeById}/>

                  <AppContext.Consumer>
                    {
                      appContext => (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row'
                          }}
                        >
                          <Button style="secondary"
                            onClick={()=>{
                              this.setState({
                                showLogin: true
                              })
                            }}
                          >
                            Login
                          </Button>

                          <Route render={({history})=>{
                            return (
                              <Button style="primary" 
                                onClick={()=>{
                                  appContext.actions.startAppTransition()
                                  history.push('/dashboard')
                                }}
                              >
                                Register
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
        </section>
      </article>
    )
  }
}

export default Register
