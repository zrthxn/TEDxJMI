import React from 'react'
import './Paper.css'

export function Paper(props:any) {
  return (
    <div className="paper">
      {
        props.children
      }
    </div>
  )
}

export default Paper
