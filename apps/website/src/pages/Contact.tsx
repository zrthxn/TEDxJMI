import React, { Component } from 'react'
import '../App.css'

import Paper from '../components/Paper/Paper'
import Button from '../components/Button/Button'
import { Textbox, Textarea } from '../components/Textbox/Textbox'
import { handleChangeById as inputHandler, emailValidation } from '../libs/util/inputHandler'


export class Contact extends Component {
  state = {
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

  render() {
    return (
      <article>
        <h2>Contact</h2>

        <section style={{ width: '25em' }}>
          <Paper>
            <div className="head" style={{ padding: '1em' }}>
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

            <Button style="primary" onClick={()=>{}}>SEND</Button>
          </Paper>
        </section>
      </article>
    )
  }
}

export default Contact
