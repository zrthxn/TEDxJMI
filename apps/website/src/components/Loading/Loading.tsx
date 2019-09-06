import React, { Component } from 'react'

import './Loading.css'
import '../../App.css'

export function Loading() {
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
    </div>
  )
}

export default Loading
