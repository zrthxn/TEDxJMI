import React, { Component } from 'react'
import '../App.css'
import './styles/Contact.css'

import Paper from '../components/Paper/Paper'
import Button from '../components/Button/Button'
import { Textbox, Textarea } from '../components/Textbox/Textbox'
import { handleChangeById as inputHandler, emailValidation } from '../libs/util/inputHandler'
import { AppContext } from '../AppContext';


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
    itratableMembers: []
  }

  handleChangeById = (event:any) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  sendMessage = (data:object, callback:Function) => {
    this.setState(()=>{
      setTimeout(callback, 3000)
      return {
        showConfirmation: true
      }
    })
  }

  render() {
    return (
      <article>
        <h2>Contact</h2>

        {
          this.state.showConfirmation ? (
            <section>
              <h3>Thank You</h3>
              <p>
                Your message has been sent and we will get back to you.
              </p>
            </section>            
          ) : (
            <section className="contact-form">
              <Paper>
                <div className="head">
                  <h3>Send a Message</h3>
                  <p>And we will get back to you!</p>
                </div>

                <Textbox id="name" placeholder="Name"
                  onChange={this.handleChangeById}
                />

                <Textbox id="email" placeholder="Email"
                  onChange={this.handleChangeById}
                  validation={(event:any)=>{
                    return emailValidation(event.target.value)
                  }}
                  validationErrorHelptext="Not a valid email address"
                />

                <Textarea id="message" placeholder="Message"
                  onChange={this.handleChangeById} 
                />
                <AppContext.Consumer>
                  {
                    appContext => (
                      <Button color="primary" size="medium" onClick={()=>{
                        appContext.actions.startAppTransition()
                        this.sendMessage(this.state.data, appContext.actions.endAppTransition)
                      }}>SEND</Button>
                    )
                  }
                </AppContext.Consumer>
                
              </Paper>
            </section>
          )
        }

        
      </article>
    )
  }
}

export default Contact
