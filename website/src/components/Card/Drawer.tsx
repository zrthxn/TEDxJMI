import React from 'react'
import './Card.css'

export default function Drawer(props:any) {
  return (
    <div className="drawer">
      <div className="drawer-content">
        {
          props.children
        }
      </div>
      
      <span className="drawer-close" onClick={props.onClose}>Close</span>
    </div>
  )
}
