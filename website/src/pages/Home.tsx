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

        <article>
          <br/><br/>
          <section className="center">
            <img src="/assets/jmi.png" alt="" width="150px"/>

            <h2>Jamia Millia Islamia</h2>

            Jamia Millia Islamia made a modest beginning in 1920 at Aligarh, with the resolute determination of its founders.
            Shaikhul Hind Maulana Mahmud Hasan, Maulana Muhammad Ali Jauhar, Jenab Hakim Ajmal Khan, Dr. Mukhtar Ahmad Ansari, 
            Jenab Abdul Majeed Khwaja, and Dr. Zakir Hussain to create an institution that would manifest indigenous ethos and 
            spirit of plurality. <br/><br/>
            
            It was conceived as a national institution that would offer progressive education and nationalist 
            ideals to students from all communities, particularly the Muslims. The emergence of Jamia was supported by Gandhiji 
            and Tagore who felt that Jamia could shape lives of hundreds and thousands of students on the basis of a shared 
            culture and worldview. Jamia’s development is marked by sacrifices made by the staff and students and a host of 
            individuals who contributed through myriad efforts. <br/><br/>
          </section>  
          <br/><br/>
        </article>

        <article style={{ maxHeight: '36em', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
          <video autoPlay muted style={{ width: '100%', objectFit: 'cover' }}>
            <source src="/assets/promovideo.mp4" type="video/mp4"/>
          </video>
        </article>

        <article style={{ backgroundColor: '#fff', color: '#000' }}>
          <br/>
          <h2>Partners</h2>
          <section className="partners">
            <div className="partner">
              <img src="/assets/img/partners/Lotto.jpg" alt=""/>
            </div>

            <div className="partner">
              <img src="/assets/img/partners/JamiaCoop.png" alt=""/>
            </div>

            <div className="partner">
              <img src="/assets/img/partners/Powergrid.png" alt=""/>
            </div>

            <div className="partner">
              <img src="/assets/img/partners/Rataal.jpg" alt=""/>
            </div>

            <div className="partner">
              <img src="/assets/img/partners/Masah.jpg" alt=""/>
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
