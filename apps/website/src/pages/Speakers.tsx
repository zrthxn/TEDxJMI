import React, { Component } from 'react'

import '../App.css'

import { Card, CardContainer } from '../components/Card/Card'

export class Speakers extends Component {
  render() {
    return (
      <article>
        <h2>Speakers</h2>
        
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
          </CardContainer>
        </section>
      </article>
    )
  }
}

export default Speakers
