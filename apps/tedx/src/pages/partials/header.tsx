import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div>
        <nav id="navigation" className="navbar navbar-fixed-top navbar-dark">
          <div className="container">
            <div className="row">
              <div className="navbar-header col-lg-3">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#navbar"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <a
                  className="navbar-brand font-family-alt letter-spacing-1 text-extra-large text-uppercase"
                  href="/"
                >
                  <img
                    className="logo-navbar-dark"
                    src="../../assets/images/logos/dark.png"
                    alt="TEDxJMI"
                  />
                  <img
                    className="logo-navbar-white"
                    src="../../assets/images/logos/light.png"
                    alt="TEDxJMI"
                  />
                </a>
              </div>
              <div
                id="navbar"
                className="navbar-collapse collapse col-lg-9 pull-right"
              >
                <ul className="nav navbar-nav font-family-alt letter-spacing-1 text-uppercase font-weight-700">
                  <li>
                    <a href="#page-top" className="page-scroll">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/speakers/" className="line-height-unset">
                      Speakers
                    </a>
                  </li>
                  <li>
                    <a href="/team/" className="line-height-unset">
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a href="/alumni/" className="line-height-unset">
                      Alumni
                    </a>
                  </li>
                  <li>
                    <a href="/sponsors/" className="line-height-unset">
                      Sponsors
                    </a>
                  </li>
                  <li>
                    <a href="/contact/" className="line-height-unset">
                      Contact Us
                    </a>
                  </li>
                  <li className="bg-base-color">
                    <a
                      href="/register/"
                      className="line-height-unset width-100"
                    >
                      Register
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
