import React, { Component } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/color_red.css";
import "../assets/css/flickity.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/main.css";
import "../assets/css/style.css";

class NotFound extends Component {
  render() {
    return (
      <section id="404" className="bg-white-3">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <h2 className="font-family-alt font-weight-700 sm-title-large title-extra-large-2 text-gray-dark-2">
                Page not found
              </h2>
              <span className="bg-base-color xs-margin-8 xs-no-margin-rl margin-4 no-margin-rl separator-line-extra-thick-long" />
              <p className="font-family-alt sm-text-large text-extra-large text-gray-dark-2">
                Please check the URL, return to the <a href="/">homepage</a>, or
                check out links to other pages from the navigation menu.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default NotFound;