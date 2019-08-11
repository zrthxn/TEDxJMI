import React, { Component } from 'react'

import '../App.css'
import './styles/Home.css'

import { Title } from '../components/Title/Title'

export class Home extends Component {
  render() {
    return (
      <div>
        <article className="hero">
          <div>
            <h1>Breaking Shackles</h1>
            <h2>10<sup>th</sup> November</h2>
          </div>  
        </article>
        
        <article className="home-about">
          <section >
            <h3>ABOUT</h3>

            <p>
              TEDxJMI brings together a collection of doers, thinkers, innovators, explorers, visionaries, teachers and learners 
              We seek to illuminate, inspire, change perceptions, incite action and foster new connections. <br/>
              We are focused on proffering a TED stage to speakers of varied backgrounds and experiences for inspirational 
              and intellectual acceleration.
            </p>
          </section>  
        </article>

        <article className="home-venue">
          <h3>Jamia Millia Islamia, New Delhi</h3>
        </article>
      </div>
    )
  }
}

export default Home
