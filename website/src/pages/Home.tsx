import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import './styles/Home.css'

import { Button } from '../components/Button/Button'
import AppContext from '../AppContext'

export class Home extends Component {
  render() {
    return (
      <div>
        <article className="hero">
          <div id="particles" className="particles"></div>
          <div className="content">
            <h1>Breaking Shackles</h1>
            <h3>10<sup>th</sup> November</h3>
            <AppContext.Consumer>
              {
                appContext => (
                  <Button color="primary" 
                    onClick={()=>{
                      appContext.actions.router('/register')
                  }}>
                    Register
                  </Button>
                )
              }
            </AppContext.Consumer>
          </div>  
        </article>
        
        <article className="about">
          <section className="content">
            <h2>The TED<sup>x</sup> Conference</h2>

            <p>
              TEDxJMI brings together a collection of doers, thinkers, innovators, explorers, visionaries, teachers and learners 
              We seek to illuminate, inspire, change perceptions, incite action and foster new connections. <br/><br/>

              We are focused on proffering a TED stage to speakers of varied backgrounds and experiences for inspirational 
              and intellectual acceleration. <br/><br/>

              In the spirit of ideas worth spreading, TEDx is a program for local, self-organized events that bring people 
              together to share a TED-like experience. At a TEDx event, TEDTalks video and live speakers combine to spark deep 
              discussion and connection.
            </p>
          </section>  
        </article>

        <article className="venue">
          <h3>Jamia Millia Islamia, New Delhi</h3>
          <Link to={'#'} onClick={()=>{
            window.open('https://goo.gl/maps/4Y14DhZe4Fu')
          }}>
            Where is This?
          </Link>
        </article>
      </div>
    )
  }
}

export default Home
