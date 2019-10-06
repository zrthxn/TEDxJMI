import React, { Component } from 'react'
import '../App.css'
import './styles/Contact.css'

import Paper from '../components/Paper/Paper'
import Button from '../components/Button/Button'
import { Textbox, Textarea } from '../components/Textbox/Textbox'
import { handleChangeById as inputHandler, emailValidation } from '../libs/util/inputHandler'
import { AppContext } from '../AppContext';
import { Link } from 'react-router-dom'
import { APIService } from '../libs/api/api'

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
  
  apiService = new APIService()

  handleChangeById = (event:any) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  sendMessage = async () => {
    if(this.state.requiredFulfilled && this.state.fieldsValidated) {
      await this.apiService.contactUs(this.state.data)
      this.setState({ showConfirmation: true })
    }
    else
      alert('Please fill in all the fields correctly.')
  }

  render() {
    return (
      <article>
        <h1>Contact</h1>

        <section className="center">
          Use the contact form to get in touch with us <br/>
          Or contact us at the phone or email given below
        </section>

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

        <section className="center">
          <h3>Khawar Suhail <br/><span style={{ opacity: 0.5, fontSize: '0.8em' }}>Organiser</span></h3>
          <a href="tel:8188943884" style={{ textAlign: 'center', color: '#ff0000' }}>+91 8188943884</a>
          <br/><br/>
          <h3>Mohd. Ammar <br/><span style={{ opacity: 0.5, fontSize: '0.8em' }}>Organiser</span></h3>
          <a href="tel:8800206651" style={{ textAlign: 'center', color: '#ff0000' }}>+91 8800206651</a>
          <br/><br/>

          <p style={{ textAlign: 'center', fontSize: '1.25em', opacity: 0.5 }}>Email</p>
          <a href="mailto:team@tedxjmi.org" style={{ color: '#fff' }}>
            <h3>team@tedxjmi.org</h3>
          </a>
        </section>        
      </article>
    )
  }
}

export default Contact
