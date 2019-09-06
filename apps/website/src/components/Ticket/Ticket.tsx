import React, { Component } from 'react'
import Button from '../Button/Button'
import './Ticket.scss'

import { TicketModel } from '../../Models'

interface TicketProps {
  data: TicketModel,
  onUpdate?: Function,
  onCancel?: Function
}

export class Ticket extends Component<TicketProps> {
  state = {
    
  }

  render() {
    return (
      <div className="ticket">
        <div className="ticket-body">
          <h3 className="title">{ this.props.data.createdOn }</h3>

          <Button size="small" color="primary" onClick={()=>{
            if(this.props.onCancel!==undefined)
              this.props.onCancel()
          }}>
            Cancel
          </Button>

          <Button size="small" color="secondary" onClick={()=>{
            if(this.props.onUpdate!==undefined)
              this.props.onUpdate()
          }}>
            Update
          </Button>
        </div>
      </div>
    )
  }
}

export default Ticket
