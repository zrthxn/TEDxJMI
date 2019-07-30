import React, { Component } from 'react'

import './Textbox.css'

export interface TextboxProps {
  onChange: Function,
  placeholder?: string,
  validation?: Function,
  onValidate?: Function,
  validationErrorHelptext?: string,
  hideCheckWhenValidatedTrue?: boolean
}
export class Textbox extends Component<TextboxProps> {
  state = {
    needsValidation: false,
    isValidated: false
  }

  render() {
    return (
      <div className="textbox-container">
        <div className="input-container">
          <input className="textbox" type="text" placeholder={this.props.placeholder}
            onChange={(event)=>{
              this.props.onChange(event)
              
              var validationResult:boolean
              if(this.props.validation!==undefined)
                validationResult = this.props.validation(event)

              this.setState((prevState, props)=>{
                if(this.props.validation!==undefined)
                  if(validationResult) {
                    if(this.props.onValidate!==undefined)
                      this.props.onValidate(event)
                    return {
                      needsValidation: true,
                      isValidated: true
                    }
                  }                  
                  else 
                    return {
                      needsValidation: true,
                      isValidated: false
                    }
                else
                  return {
                    needsValidation: false
                }
              })
            }}
          />

          {
            this.state.needsValidation ? (
              <span className="validation">
                {
                  this.state.isValidated ? (
                    this.props.hideCheckWhenValidatedTrue!==undefined ? (
                      this.props.hideCheckWhenValidatedTrue ? (
                        <span></span>
                      ) : (
                        <span className="true"></span>
                      )
                    ) : (
                      <span></span>
                    )
                  ) : (
                    <span className="false"></span>
                  )
                }
              </span>
            ) : (
              <span></span>
            )
          }
        </div>

        {
          this.state.needsValidation ? (
            this.state.isValidated ? (
              <span></span>
            ) : (
              <span className="val-error-text">
                {
                  this.props.validationErrorHelptext
                }
              </span>
            )
          ) : (
            <span></span>
          )
        }
      </div>
    )
  }
}
