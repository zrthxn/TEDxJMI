import React, { Component } from 'react'

import './Paper.css'

export interface PaperProps {

}
export class Paper extends Component<PaperProps> {
  state = {

  }

  render() {
    return (
      <div className="paper">
        {
          this.props.children
        }
      </div>
    )
  }
}

export default Paper
