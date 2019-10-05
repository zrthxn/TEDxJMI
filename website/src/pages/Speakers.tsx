import React, { Component } from 'react'
import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'
import Drawer from '../components/Card/Drawer'

export class Speakers extends Component {
  render() {
    return (
      <article>
        <h1>Speakers</h1>
        <br/>
        <section className="center">
          <h2>To be Announced</h2>
        </section>

        <h3>2017</h3>
        <section>
          <CardContainer>
            <Card size="medium" drawer={()=>(
              <div>
                <h1>Drawer Content</h1>
              </div>
            )}>
              <img alt="speaker" src="/assets/img/speakers/KavitaBahl.jpg"/>
              <div className="sub">Kavita Bahl</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/NandanSaxena.jpg"/>
              <div className="sub">Nandan Saxena</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/RajeshSGokhale.jpg"/>
              <div className="sub">Rajesh S Gokhale</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/RamakrishnaRamaSwamy.jpg"/>
              <div className="sub">Ramakrishna Ramaswamy</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/SadafHussain.jpg"/>
              <div className="sub">Sadaf Hussain</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/SaeedNaqvi.jpg"/>
              <div className="sub">Saeed Naqvi</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/TanmayaJain.jpg"/>
              <div className="sub">Tanmaya Jain</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/VivekSharma.jpg"/>
              <div className="sub">Vivek Sharma</div>
            </Card>
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Speakers
