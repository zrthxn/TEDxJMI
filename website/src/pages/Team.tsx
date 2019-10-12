import React, { Component } from 'react'
import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'

export class Team extends Component {
  render() {
    return (
      <article>
        <h1>The Team</h1>
        {/* <section className="center">
          These are the people responsible for finding voices that have ideas which can inspire people.
        </section> */}

        <section className="center">
          <h2>Faculty Advisors</h2>
          <CardContainer>
            <Card size="medium">
              <img alt="team" src="/assets/img/team/rihan.jpg"/>
              <div className="sub">
                <b>Prof. Rihan K. Suri</b><br/>
                Placement Officer
              </div>
            </Card>

            <Card size="medium">
              <img alt="team" src="/assets/img/team/x.png"/>
              <div className="sub">
                <b>Prof. Seemi Farhat</b><br/>
                Dean of Student Welfare
              </div>
            </Card>
          </CardContainer>
        </section>

        <section className="center">
          <h2>Organizers</h2>
          <CardContainer>
            <Card size="medium">
              <img alt="team" src="/assets/img/team/khawar.jpg"/>
              <div className="sub">Khawar Suhail</div>
            </Card>

            <Card size="medium">
              <img alt="team" src="/assets/img/team/ammar.jpg"/>
              <div className="sub">Mohd. Ammar</div>
            </Card>
          </CardContainer>
        </section>

        <section className="center">
          <h2>Curation and Delegate Affairs</h2>
          <div>
            <CardContainer>
              <Card size="medium">
                <img alt="team" src="/assets/img/team/saima.jpg"/>
                <div className="sub">Saima Shamim</div>
              </Card>

              <Card size="medium">
                <img alt="team" src="/assets/img/team/shruty.jpg"/>
                <div className="sub">Shruty Yadav</div>
              </Card>

              <Card size="medium">
                <img alt="team" src="/assets/img/team/mehnaz.jpg"/>
                <div className="sub">Mehnaz Hussain</div>
              </Card>
            </CardContainer>

            <CardContainer>
              <Card size="medium">
                <img alt="team" src="/assets/img/team/ramsha.jpg"/>
                <div className="sub">Ramsha Khan</div>
              </Card>

              <Card size="medium">
                <img alt="team" src="/assets/img/team/shireen.jpg"/>
                <div className="sub">Shireen Syed</div>
              </Card>
            </CardContainer>
          </div>
        </section>

        <section className="center">
          <h2>Marketing and Public Relations</h2>
          <div>
            <CardContainer>
              <Card size="medium">
                <img alt="team" src="/assets/img/team/alisamar.jpg"/>
                <div className="sub">Alisamar Husain</div>
              </Card>

              <Card size="medium">
                <img alt="team" src="/assets/img/team/anvita.jpeg"/>
                <div className="sub">Anvita Goel</div>
              </Card>
            </CardContainer>
          </div>
        </section>

        <section className="center">
          <h2>Sponsor Relations</h2>
          <CardContainer>
            <Card size="medium">
              <img alt="team" src="/assets/img/team/sadia.jpg"/>
              <div className="sub">Sadia Khanum</div>
            </Card>
          </CardContainer>
        </section>

        <section className="center">
          <h2>Media and Technical Affairs</h2>
          <CardContainer>
            <Card size="medium">
              <img alt="team" src="/assets/img/team/mariam.jpg"/>
              <div className="sub">Mariam Gada</div>
            </Card>

            <Card size="medium">
              <img alt="team" src="/assets/img/team/zaid.jpg"/>
              <div className="sub">Zaid</div>
            </Card>
          </CardContainer>
        </section>

        <section className="center">
          <h2>Production and<br/>Logistics</h2>
          <CardContainer>
            <Card size="medium">
              <img alt="team" src="/assets/img/team/zuhair.jpg"/>
              <div className="sub">Zuhair Siddiqui</div>
            </Card>

            <Card size="medium">
              <img alt="team" src="/assets/img/team/danyaal.jpg"/>
              <div className="sub">Danyaal Jameel</div>
            </Card>
          </CardContainer>

          <CardContainer>
            <Card size="medium">
              <img alt="team" src="/assets/img/team/sufu.jpg"/>
              <div className="sub">Sufiyan Sajid</div>
            </Card>
            
            <Card size="medium">
              <img alt="team" src="/assets/img/team/suhaib.jpg"/>
              <div className="sub">Suhaib</div>
            </Card>
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Team
