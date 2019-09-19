import React, { Component } from 'react'
import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'

export class Team extends Component {
  render() {
    return (
      <article>
        <h1>The Team</h1>
        <section className="center">
          These are the people responsible for finding voices that have ideas which can inspire people.
        </section>

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
              <img alt="team" src="/assets/img/team/simi.jpg"/>
              <div className="sub">
                <b>Prof. Simi Farhat</b><br/>
                Dean of Student Welfare
              </div>
            </Card>
          </CardContainer>

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

          <h2>Curation and Delegate Affairs</h2>
          <CardContainer>
            <Card size="medium">
              <img alt="team" src="/assets/img/team/saima.jpg"/>
              <div className="sub">Saima Shamim</div>
            </Card>

            <Card size="medium">
              <img alt="team" src="/assets/img/team/alisamar.jpg"/>
              <div className="sub">Alisamar Husain</div>
            </Card>

            <Card size="medium">
              <img alt="team" src="/assets/img/team/anvita.jpg"/>
              <div className="sub">Anvita Goel</div>
            </Card>
          </CardContainer>

          <h2>Sponsorship and Public Relations</h2>
          <CardContainer>
            <Card size="medium">
              <img alt="team" src="/assets/img/team/sadia.jpg"/>
              <div className="sub">Sadia Khannum</div>
            </Card>

            <Card size="medium">
              <img alt="team" src="/assets/img/team/zuhair.jpg"/>
              <div className="sub">Zuhair</div>
            </Card>
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Team
