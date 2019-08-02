import React, { Component } from 'react'

import '../App.css'
import './styles/Home.css'

import { Title } from '../components/Partials/Title/Title'

export class Home extends Component {
  render() {
    return (
      <article>
        <div className="title">
          <Title/>
        </div>
        
      </article>
    )
  }
}

export default Home
