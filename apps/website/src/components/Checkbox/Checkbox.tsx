import React from 'react'
import './Checkbox.scss'

interface CheckboxProps {
  label?: string
  checked?: boolean
  onChecked?: Function
  onChange?: Function
}

export function Checkbox(props:CheckboxProps) {
  var { checked } = props

  return (
    <label className="checkbox">
      <p>{ props.label }</p>
      <input type="checkbox" defaultChecked={checked}
        onChange={({ target })=>{
          checked = target.checked
          if(target.checked)
            if(props.onChecked!==undefined)
              props.onChecked()

          if(props.onChange!==undefined)
            props.onChange(target)
        }}
      />
      <span className="checkmark"></span>
    </label>
  )
}

export default Checkbox
