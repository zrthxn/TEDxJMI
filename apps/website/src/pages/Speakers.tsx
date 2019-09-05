import React, { Component } from 'react'
import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'

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
            <Card size="medium">
              <img alt="speaker" src="/res/speakers/KavitaBahl.jpg"/>
              <div className="sub">Kavita Bahl</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/res/speakers/NandanSaxena.jpg"/>
              <div className="sub">Nandan Saxena</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/res/speakers/RajeshSGokhale.jpg"/>
              <div className="sub">Rajesh S Gokhale</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/res/speakers/RamakrishnaRamaSwamy.jpg"/>
              <div className="sub">Ramakrishna Ramaswamy</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/res/speakers/SadafHussain.jpg"/>
              <div className="sub">Sadaf Hussain</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/res/speakers/SaeedNaqvi.jpg"/>
              <div className="sub">Saeed Naqvi</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/res/speakers/TanmayaJain.jpg"/>
              <div className="sub">Tanmaya Jain</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/res/speakers/VivekSharma.jpg"/>
              <div className="sub">Vivek Sharma</div>
            </Card>
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Speakers
