import React, { Component } from 'react'

interface LoginProps {
  onAuth: Function
}

export default class Login extends Component<LoginProps> {
  state = {
    password: null
  }

  render() {
    return (
      <div>
        <div>
          <input type="password" placeholder="Password"
            onChange={({ target })=>{
              this.setState({
                password: target.value
              })
            }}
          />

          <button onClick={()=>{
            if(this.state.password)
              if(this.state.password!=='shabbaralee')
                this.props.onAuth()
          }}>
            Login
          </button>
        </div>
      </div>
    )
  }
}
