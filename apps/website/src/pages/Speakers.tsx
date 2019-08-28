import React, { Component } from 'react'

import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'

export class Speakers extends Component {
  render() {
    return (
      <article>
        <h2>Speakers</h2>
        <br/>
        <section>
          <CardContainer>
            <Card size="small">
              <div className="tba">
                To be announced
                <br/><br/><br/><br/>
                <div className="tedxjmi">
                <span className="alpha"><b>TEDx</b></span>
                <span className="beta">JMI</span>
                </div>
              </div>
              </Card>
              <Card size="small">
              <div className="tba">
                To be announced
                <br/><br/><br/><br/>
                <div className="tedxjmi">
                <span className="alpha"><b>TEDx</b></span>
                <span className="beta">JMI</span>
                </div>
              </div>
              </Card>
              <Card size="small">
              <div className="tba">
                To be announced
                <br/><br/><br/><br/>
                <div className="tedxjmi">
                <span className="alpha"><b>TEDx</b></span>
                <span className="beta">JMI</span>
                </div>
              </div>
              </Card>
              <Card size="small">
              <div className="tba">
                To be announced
                <br/><br/><br/><br/>
                <div className="tedxjmi">
                <span className="alpha"><b>TEDx</b></span>
                <span className="beta">JMI</span>
                </div>
              </div>
              </Card>
              <Card size="small">
              <div className="tba">
                To be announced
                <br/><br/><br/><br/>
                <div className="tedxjmi">
                <span className="alpha"><b>TEDx</b></span>
                <span className="beta">JMI</span>
                </div>
              </div>
              </Card>
              <Card size="small">
              <div className="tba">
                To be announced
                <br/><br/><br/><br/>
                <div className="tedxjmi">
                <span className="alpha"><b>TEDx</b></span>
                <span className="beta">JMI</span>
                </div>
              </div>
              </Card>
              <Card size="small">
              <div className="tba">
                To be announced
                <br/><br/><br/><br/>
                <div className="tedxjmi">
                <span className="alpha"><b>TEDx</b></span>
                <span className="beta">JMI</span>
                </div>
              </div>
              </Card>
              <Card size="small">
              <div className="tba">
                To be announced
                <br/><br/><br/><br/>
                <div className="tedxjmi">
                <span className="alpha"><b>TEDx</b></span>
                <span className="beta">JMI</span>
                </div>
              </div>
              </Card>
          </CardContainer>
        </section>
        <h3>2018</h3>
        <section>
          <CardContainer>
            <Card size="small">
              <img alt="speaker" src="/res/speakers/KavitaBahl.jpg"/>
            </Card>
            <Card size="small">
              <img alt="speaker" src="/res/speakers/NandanSaxena.jpg"/>
            </Card>
            <Card size="small">
              <img alt="speaker" src="/res/speakers/RajeshSGokhale.jpg"/>
            </Card>
            <Card size="small">
              <img alt="speaker" src="/res/speakers/RamakrishnaRamaSwamy.jpg"/>
            </Card>
            <Card size="small">
              <img alt="speaker" src="/res/speakers/SadafHussain.jpg"/>
            </Card>
            <Card size="small">
              <img alt="speaker" src="/res/speakers/SaeedNaqvi.jpg"/>
            </Card>
            <Card size="small">
              <img alt="speaker" src="/res/speakers/TanmayaJain.jpg"/>
            </Card>
            <Card size="small">
              <img alt="speaker" src="/res/speakers/VivekSharma.jpg"/>
            </Card>
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Speakers
