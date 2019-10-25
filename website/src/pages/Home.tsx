import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import './styles/Home.css'

import { Button } from '../components/Button/Button'
import AppContext from '../AppContext'
import { triggerParticles } from '../Particles'

export class Home extends Component {
  componentDidMount() {
    triggerParticles()
  }
  
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
            <h2>The TEDx Conference</h2>

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

        <article style={{ maxHeight: '42em', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
          <video autoPlay muted style={{ width: '100%', objectFit: 'cover' }}>
            <source src="/assets/promovideo.mp4" type="video/mp4"/>
          </video>
        </article>

        <article style={{ backgroundColor: '#fff', color: '#000' }}>
          <section className="partners">
            <div className="partner">
              <img src="/assets/img/partners/Lotto.jpg" alt=""/>
              <h3>Lotto</h3>
              <p> Youth Partner </p>
            </div>

            <div className="partner">
              <img src="/assets/img/partners/IEEE.png" alt=""/>
              <h3>IEEE JMI</h3>
              <p> Logistics Partner </p>
            </div>
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
