import React, { Component } from 'react'

const styles = {
  block: {
    borderRight: '1px solid #1c1c1c80',
    borderLeft: '1px solid #1c1c1c80'
  },
  container: {

  }
}

export default class Seating extends Component {
  state = {
    password: null,
    seats: [
      { isBooked: false, isBlocked: false, seatNumber: 'A1' },
      { isBooked: false, isBlocked: false, seatNumber: 'A2' },
      { isBooked: false, isBlocked: false, seatNumber: 'A3' },
      { isBooked: false, isBlocked: false, seatNumber: 'A4' },
      { isBooked: false, isBlocked: false, seatNumber: 'A5' }
    ]
  }

  componentDidMount() {
    
  }
  
  render() {
    return (
      <div style={{ padding: '1em' }}>
        <h1>Seating Plan</h1>

        <div style={{
          backgroundColor: '#1c1c1c40',
          padding: '1em', margin: '1em 0',
          textAlign: 'center'
        }}>
          <h3>Stage</h3>
          <p>All eyes this way</p>
        </div>

        <div style={{
          display: 'flex', flexDirection: 'row'
        }}>
          <div style={styles.block}>
            {
              this.state.seats.map((seat)=>(
              <button disabled={seat.isBlocked} style={{
                  margin: '0.25em',
                  padding: '0.5em',
                  borderRadius: '5px',
                  borderColor: seat.isBooked ? '#dd0000' : 'auto',
                }}
                onClick={()=>{

                }}
              >
                { seat.seatNumber }
              </button>
              ))
            }
          </div>

          <div style={styles.block}>
            {
              this.state.seats.map((seat)=>(
              <button disabled={seat.isBlocked} style={{
                  margin: '0.25em',
                  padding: '0.5em',
                  borderRadius: '5px',
                  borderColor: seat.isBooked ? '#dd0000' : 'auto',
                }}
                onClick={()=>{

                }}
              >
                { seat.seatNumber }
              </button>
              ))
            }
          </div>

          <div style={styles.block}>
            {
              this.state.seats.map((seat)=>(
              <button disabled={seat.isBlocked} style={{
                  margin: '0.25em',
                  padding: '0.5em',
                  borderRadius: '5px',
                  borderColor: seat.isBooked ? '#dd0000' : 'auto',
                }}
                onClick={()=>{

                }}
              >
                { seat.seatNumber }
              </button>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}
