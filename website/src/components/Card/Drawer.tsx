import React from 'react'
import { CardContext } from './Card'
import './Card.css'

export default function Drawer(props:any) {
  return (
    <CardContext.Consumer>
      {
        cardContext => (
          <div>
            {
              cardContext.state.openDrawer ? (
                <div className="drawer">
                  <div className="drawer-content">
                    {
                      props.children
                    }
                  </div>
                  
                  <span className="drawer-close" onClick={cardContext.actions.toggleDrawer}>
                    Tap to Close
                  </span>
                </div>
              ) : (
                null
              )
            }
          </div>
        )
      }
    </CardContext.Consumer>
  )
}
