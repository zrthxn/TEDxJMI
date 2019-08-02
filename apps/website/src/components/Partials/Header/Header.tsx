import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

import { Title } from '../Title/Title'

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="container">
          <div className="logo">
            <Title/>
          </div>
          
          <input type="checkbox" ref="sidebarToggle" id="sidebar-toggle" hidden/>
          <label htmlFor="sidebar-toggle" className="hamburger"><span></span></label>

          <script type="text/javascript">
            {
              // `
              // let toggle = document.getElementById("sidebar-toggle");
              // let links = document.getElementsByTagName("a");
              // for(let i=0; i<links.length; i++) {
              //   links[i].onclick = () => {
              //     toggle.checked = false;
              //   }
              // }
              // `
            }
          </script>
          
          <div className="sidebar">
            <nav className="sidebar-nav">
              <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/team'}>Team</Link></li>
                <li><Link to={'/speakers'}>Speakers</Link></li>
                <li><Link to={'/contact'}>Contact</Link></li>
                <li><Link to={'/register'}>Register</Link></li>
              </ul>
            </nav>
            <div className="accent"></div>
          </div>

          <div className="sidebar-shadow" id="sidebar-shadow"></div>
          
          <nav className="desktop-nav">
            <ul>
              <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/team'}>Team</Link></li>
              <li><Link to={'/speakers'}>Speakers</Link></li>
              <li><Link to={'/contact'}>Contact</Link></li>
              <li><Link to={'/register'}>Register</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}
