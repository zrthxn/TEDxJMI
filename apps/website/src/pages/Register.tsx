import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import '../App.css'
import './styles/Register.css'

import { Paper } from '../components/Paper/Paper'
import { Textbox } from '../components/Textbox/Textbox'
import { Button } from '../components/Button/Button'

import { AppContext } from '../AppContext'
import { handleChangeById as inputHandler, emailValidation } from '../libs/util/inputHandler'
import { auth, database } from '../libs/util/database';
import { timingSafeEqual } from 'crypto';

export class Register extends Component {
  state = {
    showLogin: false,
    data: {
      regName: null,
      regEmail: '',
      regPhone: '',
      regPassword: '',
      regConfirmPass: '',
      loginEmail: null,
      loginPw: null
    },
    loggedIn: false,
    requiredFulfilled: false,
    fieldsValidated: false,
    required: [
      'regName', 'regEmail', 'regPhone'
    ],
    itratableMembers: []
  }

  handleChangeById = (event: any) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props) => (
      result
    ))
  }

  async registerUser() {
    await database.ref("users/" + this.state.data.regEmail).once('value').then((snapshot) => {
      if (snapshot.val().length > 0) {
        //User already exists
      }
      else {
        auth.createUserWithEmailAndPassword(this.state.data.regEmail, this.state.data.regPassword)
          .then(() => {
            database.ref("users/" + this.state.data.regEmail).set({
              "Email": this.state.data.regEmail,
              "FirstName": this.state.data.regName,
              "Phone": this.state.data.regPhone
            })
            this.setState({
              userLoggedIn: true
            })
          })
          .catch((error) => {
            console.log(error.code);
            console.log(error.message)
          })
      }
    })
  }

  render() {
    return (
      this.state.loggedIn ? (
        // <section style={{width:'25em'}}>
        // <Paper>
        //   <AppContext.Consumer>
        //     {
        //       appContext => (
        //         <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                  
        //           <Route render={({ history }) => {
        //             return (
        //               <Button color="primary"
        //                 onClick={() => {
        //                   appContext.actions.startAppTransition()
        //                   history.push('/dashboard')
        //                 }}
        //               >
        //                 Proceed
        //             </Button>
        //             )
        //           }} />
        //         </div>
        //       )
        //     }
        //   </AppContext.Consumer>
        // </Paper>
        // </section>
        // SOMETHING TO ROUTE TO DASHBOARD
        <div>
        </div>
      ) : (
          <article className="register">
            <h2>Register</h2>

            <section>
              <h3>Registrations Open</h3>

              <p>
                If you're a student currently studying at JMI, you can register by filling out the form provided at the link below.
                The last date of registration for JMI students is October 05.
          </p>


              <section style={{ width: '25em' }}>
                <Paper>
                  {
                    this.state.showLogin ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                        <Textbox id="loginEmail" placeholder="Email"
                          onChange={this.handleChangeById}
                          validationErrorHelptext="Not a valid email address"
                          validation={(event: any) => {
                            return emailValidation(event.target.value)
                          }}
                          onValidate={() => {
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
                                {/* <Button color="secondary"
                              onClick={() => {
                                this.setState({
                                  showLogin: false,
                                  required: [
                                    'regName', 'regEmail', 'regPhone'
                                  ]
                                })
                              }}
                            >
                              Register
                          </Button> */}

                                <Button color="secondary"
                                  onClick={() => {
                                    appContext.actions.startAppTransition()
                                    setTimeout(() => {
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
                        <div style={{ padding: "2em" }}>
                          New user? <Link to="#" onClick={() => {
                            this.setState({
                              showLogin: false
                            })
                          }}>Register</Link>
                        </div>
                      </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                          <Textbox id="regName" placeholder="Name" onChange={this.handleChangeById} />

                          <Textbox id="regEmail" placeholder="Email"
                            onChange={this.handleChangeById}
                            validationErrorHelptext="Not a valid email address"
                            validation={(e: any) => {
                              return true
                            }}
                            onValidate={() => {
                              this.setState({
                                fieldsValidated: true
                              })
                            }}
                          />
                          <Textbox id="regPhone" placeholder="Phone" onChange={this.handleChangeById} />
                          <Textbox id="regPassword" type="password" placeholder="Passcode" onChange={this.handleChangeById} />
                          <Textbox id="regConfirmPass" type="password" placeholder="Confirm Passcode" onChange={this.handleChangeById}
                            validation={() => {
                              if (this.state.data.regPassword !== this.state.data.regConfirmPass) {
                                return false
                              }
                              return true;
                            }}
                            validationErrorHelptext="Passwords do not match" />

                          <AppContext.Consumer>
                            {
                              appContext => (
                                <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '24em' }}>
                                  <Button color="secondary"
                                    onClick={() => {
                                      this.setState({
                                        showLogin: true,
                                        required: [
                                          'regEmail', 'regPhone', 'regName', 'regPass'
                                        ]
                                      })
                                    }}
                                  >
                                    Register
                          </Button>
                                  {/* 
                              <Route render={({ history }) => {
                                return (
                                  <Button color="primary"
                                    onClick={() => {
                                      appContext.actions.startAppTransition()
                                      history.push('/dashboard')
                                    }}
                                  >
                                    Start
                              </Button>
                                )
                              }} /> */}
                                </div>
                              )
                            }
                          </AppContext.Consumer>
                          <div style={{ padding: "2em" }}>
                            Already Registered? <Link to="#" onClick={() => {
                              this.setState({
                                showLogin: true
                              })
                            }}>Login</Link>
                          </div>
                        </div>
                      )
                  }
                </Paper>
              </section>
              {/* <Button onClick={()=>{}} size="medium" color="primary">Register</Button> */}

            </section>
          </article>
        )
    )
  }
}
export default Register
