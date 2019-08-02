import React, { Component } from 'react'

import '../../App.css'
import './Button.css'

export interface ButtonProps {
  id?: string,
  onClick: Function,
  style?: 'primary' | 'secondary' | 'default'
}

const buttonStyles = {
  primary: {
    backgroundColor: '#ff0000',
    border: 'none',
    color: '#fff'
  },
  secondary: {
    backgroundColor: '#000',
    border: 'none',
    color: '#fff'
  },
  default: {
    backgroundColor: '#fff',
    border: '2px solid #ff0000',
    color: '#ff0000'
  },
}

function createStyle(style:string|undefined) {
  if(style!==undefined) 
    switch(style) {
      case 'primary':
        return buttonStyles.primary
      
      case 'secondary':
        return buttonStyles.secondary
            
      case 'default':
        return buttonStyles.default

      default:
        return {}
    }
  else
    return {}
}

export class Button extends Component<ButtonProps> {
  state = {
    
  }

  render() {
    return (
      <div className="button-container">
        <button id={this.props.id} className="button"
          style={createStyle(this.props.style)}
          onClick={()=>{
            this.props.onClick()
          }}
        >
          <div className="button-label">
            {
              this.props.children
            }
          </div>
        </button>
      </div>
    )
  }
}

export default Button
