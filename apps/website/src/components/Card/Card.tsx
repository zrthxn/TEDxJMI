import React, { Component } from 'react'
import './Card.css'

export interface CardProps {
  size?: 'small' | 'medium' | 'large'
}
export class Card extends Component<CardProps> {
  state = {
    style: {
      
    }
  }

  styles = {
    sizes: {
      small: {
        width: '10em', height: '15em'
      },
      medium: {
        width: '15em', height: '20em'
      },
      large: {
        width: '18em', height: '25em'
      }
    }
  }

  componentDidMount() {
    if(this.props.size!==null)
      this.createStyle(this.props.size)
  }
  
  createStyle = (size?:CardProps['size']) => {
    if(size!==undefined) var _size = this.styles.sizes[size]

    this.setState(()=>{
      const currentStyle = this.state.style
      return {
        style: { ...currentStyle, ..._size }
      }
    })
  }

  render() {
    return (
      <div className="card" style={ this.state.style }>
        <div className="card-content">
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}

export class CardContainer extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexFlow: 'row', flexWrap: 'wrap' }}>
        {
          this.props.children
        }
      </div>
    )
  }
}

export default Card
