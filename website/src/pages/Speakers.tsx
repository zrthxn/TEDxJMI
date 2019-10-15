import React, { Component } from 'react'
import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'

export class Speakers extends Component {
  render() {
    return (
      <article>
        <h1>Speakers</h1>
        
        <section className="center">
          <CardContainer>
            <Card size="large" drawer={()=>(
              <div>
                <h1>Ishteyaque Amjad</h1>
                <h3>Vice President – Public Affairs & Communications, Coca-Cola India</h3>
                <p>
                  Ishteyaque Amjad is among distinguished and well-­regarded public affairs and brand advocacy 
                  practitioners in India. He is a leading voice on the trends and technologies that are shaping 
                  up the communications and public relations industry.
                  <br/><br/>
                  At present Ishteyaque is the Vice President, Public Affairs & Communications, at Coca­-Cola 
                  India and South West Asia. He is also on the advisory board of the leading global youth 
                  network, AIESEC.
                </p>
              </div>
            )}>
              <img alt="speaker" src="/assets/img/speakers/IshteyaqueAmjad.jpg"/>
              <div className="sub">Ishteyaque Amjad</div>
            </Card>

            <Card size="large" drawer={()=>(
              <div>
                <h1>Zain Anwar</h1>
                <h3>Filmmaker, MensXP</h3>
                <p>
                An alumnus of AJK MCRC, Jamia Millia Islamia, Zain currently heads videos for MensXP, a major 
                online lifestyle portal by Times Internet. A filmmaker by profession, Zain is a Filmfare nominated 
                director and has a series of awards under his name for his directorial work. His most noticeable 
                work has been "Mehram" an independent film which was critically acclaimed across the globe. 
                <br/><br/>
                Zain  is known for his YouTube show "Honest Reviews" which has created a new 
                language and format for film reviews on video. In the past, Zain has worked with various reputed 
                organisations like NDTV, Dainik Bhaskar, Radio Mirchi etc. 
                </p>
              </div>
            )}>
              <img alt="speaker" src="/assets/img/speakers/ZainAnwar.jpg"/>
              <div className="sub">Zain Anwar</div>
            </Card>
          </CardContainer>
        </section>

        <h2><b>Previous Years</b></h2>
        <h3>2017</h3>
        <section>
          <CardContainer>
            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/2017/KavitaBahl.jpg"/>
              <div className="sub">Kavita Bahl</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/2017/NandanSaxena.jpg"/>
              <div className="sub">Nandan Saxena</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/2017/RajeshSGokhale.jpg"/>
              <div className="sub">Rajesh S Gokhale</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/2017/RamakrishnaRamaSwamy.jpg"/>
              <div className="sub">Ramakrishna Ramaswamy</div>
            </Card>
          </CardContainer>

          <CardContainer>
            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/2017/SadafHussain.jpg"/>
              <div className="sub">Sadaf Hussain</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/2017/SaeedNaqvi.jpg"/>
              <div className="sub">Saeed Naqvi</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/2017/TanmayaJain.jpg"/>
              <div className="sub">Tanmaya Jain</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/2017/VivekSharma.jpg"/>
              <div className="sub">Vivek Sharma</div>
            </Card>
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Speakers
