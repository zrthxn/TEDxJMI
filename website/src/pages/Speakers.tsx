import React, { Component } from 'react'
import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'

export class Speakers extends Component {
  render() {
    return (
      <article>
        <h1>Speakers</h1>
        <br />
        <section className="center">
          <h2>To be Announced</h2>
        </section>

        <h3>2017</h3>
        <section>
          <CardContainer>
            <Card size="medium" linkTo="kbahl">
              <img alt="speaker" src="/assets/img/speakers/KavitaBahl.jpg" />
              <div className="sub">Kavita Bahl</div>
              <div className="drawer" id="kbahl">
                <div className="close"><span></span></div>
                  <h1>Kavita Bahl</h1>
                  <img alt="speaker" src="/assets/img/speakers/KavitaBahl.jpg" />
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacus massa, ultricies quis enim vitae, varius dictum mi. Vivamus ac augue ornare ipsum bibendum dignissim vel eget mauris. Sed sed congue neque. Donec sit amet enim felis. Phasellus ultricies, turpis non volutpat viverra, dui tortor viverra tortor, ut vehicula nisl elit vitae dolor. Maecenas sit amet iaculis lectus. Cras non semper tellus. Duis iaculis laoreet erat. Nam semper nulla quis imperdiet placerat. Quisque suscipit purus non neque tincidunt, nec tristique lectus varius. Aliquam in lacus eleifend, hendrerit justo nec, pulvinar ipsum. Integer tortor urna, hendrerit vel eros a, lobortis venenatis lorem. Nulla facilisi. Duis a mattis massa.</p>
              </div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/NandanSaxena.jpg" />
              <div className="sub">Nandan Saxena</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/RajeshSGokhale.jpg" />
              <div className="sub">Rajesh S Gokhale</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/RamakrishnaRamaSwamy.jpg" />
              <div className="sub">Ramakrishna Ramaswamy</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/SadafHussain.jpg" />
              <div className="sub">Sadaf Hussain</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/SaeedNaqvi.jpg" />
              <div className="sub">Saeed Naqvi</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/TanmayaJain.jpg" />
              <div className="sub">Tanmaya Jain</div>
            </Card>

            <Card size="medium">
              <img alt="speaker" src="/assets/img/speakers/VivekSharma.jpg" />
              <div className="sub">Vivek Sharma</div>
            </Card>
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Speakers
