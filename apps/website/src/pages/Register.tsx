import React, { Component } from 'react'

import { Paper } from '../components/Paper/Paper'
import { Textbox } from '../components/Textbox/Textbox'
import { Button } from '../components/Button/Button'

export class Register extends Component {
  render() {
    return (
      <div>
        <Paper>
          This is a paper item
          
          <Textbox placeholder="Text" hideCheckWhenValidatedTrue={true}
            onChange={(e:any)=>{
              console.log(e.target.value)
            }}
            validation={(ev:any)=>{
              if(ev.target.value==='zrthxn') return true
              else return false
            }}
            validationErrorHelptext="Invalid"
          />

          <Button style="primary"
            onClick={()=>{}}
          >
            Button
          </Button>


        </Paper>
      </div>
    )
  }
}

export default Register
