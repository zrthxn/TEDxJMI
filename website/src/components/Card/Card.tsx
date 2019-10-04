import React, { Component } from 'react'
import './Card.css'

interface CardProps {
  size?: 'small' | 'medium' | 'large',
  linkTo?: string
}

export class Card extends Component<CardProps> {
  state = {
    style: {

    },
    drawerOpened : false
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
    if (this.props.size !== null)
      this.createStyle(this.props.size)
  }

  createStyle = (size?: CardProps['size']) => {
    if (size !== undefined) var _size = this.styles.sizes[size]

    this.setState(() => {
      const currentStyle = this.state.style
      return {
        style: { ...currentStyle, ..._size }
      }
    })
  }
  clickHandler(link:string){
    if(link=='') return
    let drawerRef = document.getElementById(link);
    if(drawerRef==null) return;
    if(this.state.drawerOpened){
      drawerRef.className = drawerRef.className.split(' ')[0];
      drawerRef.className += ' disappear';
      this.setState({
        drawerOpened : false
      })
    } else {
      drawerRef.className = drawerRef.className.split(' ')[0];
      drawerRef.className += ' appear';
      this.setState({
        drawerOpened: true
      })
    }
  }

  render() {
    return (
      <a onClick={(event)=>{let param = this.props.linkTo? this.props.linkTo: ' ';this.clickHandler(param)}}>
        <div className="card" style={this.state.style}>
          <div className="card-content">
            {
              this.props.children
            }
          </div>
          <section className="drawer-shadow"></section>
        </div>
      </a>
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
