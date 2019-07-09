import React, { Component } from "react";
import MetaTags from "react-meta-tags";

import "../res/css/bootstrap.min.css";
import "../res/css/color_red.css";
import "../res/css/flickity.min.css";
import "../res/css/font-awesome.min.css";
import "../res/css/magnific-popup.css";
import "../res/css/main.css";
import "../res/css/style.css";

class Header extends Component {
  render() {
    return (
      <div>
        <MetaTags>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1"
          />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="description"
            content="TEDxJMI, x = independently organised TED event. Igniting Minds. This October, at Jamia Millia Islamia."
          />
          <meta
            name="keywords"
            content="TEDx, JMI, Jamia Millia Islamia, New Delhi, event, talks"
          />
          <meta property="og:title" content="TEDxJMI" />
          <meta
            property="og:description"
            content="Igniting Minds. This October, at Jamia Millia Islamia."
          />
          <meta
            property="og:image"
            content="https://tedxjmi.com/res/images/logos/light-social.jpg"
          />
          <meta property="og:url" content="https://tedxjmi.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@TEDx_JMI" />
          <meta itemProp="name" content="TEDxJMI" />
          <meta
            itemProp="description"
            content="Igniting Minds. This October, at Jamia Millia Islamia."
          />
          <meta
            itemProp="image"
            content="https://tedxjmi.com/res/images/logos/light-social.jpg"
          />
          <meta name="theme-color" content="#000" />
        </MetaTags>
        <nav id="navigation" className="navbar navbar-fixed-top">
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
                    src="../res/images/logos/dark.png"
                    alt="TEDxJMI"
                  />
                  <img
                    className="logo-navbar-white"
                    src="../res/images/logos/light.png"
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
                    <a href="/our-team/" className="line-height-unset">
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
