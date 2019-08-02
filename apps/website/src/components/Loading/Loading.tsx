import React, { Component } from 'react'

import './Loading.css'
import '../../App.css'

export class Loading extends Component {
  render() {
    return (
      <div className="loading-page">
        <div className="loading">
          <p>
            Loading
            <div className="spin-container">
              <div className="rotary"></div>
            </div>
          </p>
        </div>
        
        {/* <p>
          Please wait
        </p> */}
      </div>
    )
  }
}

export default Loading
