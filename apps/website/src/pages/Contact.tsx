import React, { Component } from 'react'
import '../App.css'
import './styles/Contact.css'

import Paper from '../components/Paper/Paper'
import Button from '../components/Button/Button'
import { Textbox, Textarea } from '../components/Textbox/Textbox'
import { handleChangeById as inputHandler, emailValidation } from '../libs/util/inputHandler'
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom'

export class Contact extends Component {
  state = {
    showConfirmation: false,
    data: {
      name: null,
      email: null,
      message: null
    },
    requiredFulfilled: false,
    fieldsValidated: false,
    required: [
      'name', 'email', 'message'
    ],
    iterableMembers: []
  }

  handleChangeById = (event:any) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  sendMessage = async () => {
    /**
     * @todo
     * Axios request to the server to send
     * an email and to add to mailing list
     * and to assign someone to get back to 
     * this.
     */
  }

  render() {
    return (
      <article>
        <h1>Contact</h1>

        {
          this.state.showConfirmation ? (
            <section className="center">
              <h3>Thank You</h3>
              <p style={{ textAlign: 'center' }}>
                Your message has been sent <br/> and we will get back to you very soon!
              </p>

              <Link to="#"
                onClick={()=>{
                  this.setState({
                    showConfirmation: false
                  })
                }}
              >
                Alright! Go Back
              </Link>
            </section>
          ) : (
            <section className="contact-form">
              <Paper>
                <div className="head">
                  <h3><b>Send a Message</b></h3>
                  <p>Leave your queries and questions here and we will get back to you!</p>
                </div>

                <Textbox id="name" placeholder="Name" onChange={this.handleChangeById}/>

                <Textbox id="email" placeholder="Email" onChange={this.handleChangeById}
                  validationErrorHelptext="Not a valid email address"
                  validation={(event:any)=>{
                    return emailValidation(event.target.value)
                  }}
                />

                <Textarea id="message" placeholder="Message" onChange={this.handleChangeById}/>

                <AppContext.Consumer>
                  {
                    appContext => (
                      <Button color="primary" size="medium" 
                        onClick={()=>{
                          appContext.actions.startAppTransition()
                          this.sendMessage().then(()=>{
                            setTimeout(()=>{
                              appContext.actions.endAppTransition()
                              this.setState({
                                showConfirmation: true
                              })
                            }, 1000)
                          })
                        }}
                      >
                        Send
                      </Button>
                    )
                  }
                </AppContext.Consumer>
                
                <p style={{ fontSize: '0.75em', textAlign: 'center' }}>
                  By sending this message you <br/> agree to the <Link to="/terms">Terms and Conditions</Link>
                </p>
              </Paper>
            </section>
          )
        }

        
      </article>
    )
  }
}

export default Contact
