import React, { Component } from 'react'
import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'

export class Team extends Component {
  render() {
    return (
      <article>
        <h1>Team</h1>

        <section>
          <CardContainer>
            <Card size="small">
              <div style={{ padding: '1em' }}>
                Heelo
              </div>
            </Card>

            <Card size="small">
              <div style={{ padding: '1em' }}>
                Heelo
              </div>
            </Card>

            <Card size="small">
              <div style={{ padding: '1em' }}>
                Heelo
              </div>
            </Card>
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Team
