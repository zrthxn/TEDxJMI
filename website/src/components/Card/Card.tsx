import React, { Component, ReactElement } from 'react'
import './Card.css'
import Drawer from './Drawer'

interface CardProps {
  size?: 'small' | 'medium' | 'large'
  drawer?: ((renderProps?:any)=>((typeof React.Component) | ReactElement))
}

export class Card extends Component<CardProps> {
  state = {
    openDrawer: false,
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

  toggleDrawer = () => {
    this.setState({
      openDrawer: !this.state.openDrawer
    })
  }

  render() {
    return (
      <div className="card" style={ this.state.style } onClick={this.toggleDrawer}>
        <div className="card-content" onClick={this.toggleDrawer}>
          {
            this.props.children
          }

          {
            this.state.openDrawer ? (
              this.props.drawer!==undefined && this.props.drawer!==null ? (
                <Drawer onClose={this.toggleDrawer}>
                  {
                    this.props.drawer()
                  }
                </Drawer>
              ) : null
            ) : null
          }
        </div>
      </div>
    )
  }
}

export function CardContainer(props:any) {
  return (
    <div style={{ display: 'flex', flexFlow: 'row', flexWrap: 'wrap' }}>
      {
        props.children
      }
    </div>
  )
}

export default Card
