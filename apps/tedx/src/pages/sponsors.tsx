import React, { Component } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/color_red.css";
import "../assets/css/flickity.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/main.css";
import "../assets/css/style.css";

class Sponsors extends Component {
  render() {
    return (
      <section id="alumni" className="bg-white">
        <div className="container">
          <div className="row no-padding-rl">
            <div className="col-sm-10 col-sm-offset-1">
              <h2 className="font-family-alt font-weight-700 sm-title-large title-extra-large-2 text-gray-dark-2">
                Our Sponsors
              </h2>
              <span className="bg-base-color xs-margin-6 xs-no-margin-rl margin-3 no-margin-rl separator-line-extra-thick-long" />

              <h3 className="font-family-alt font-weight-700 letter-spacing-1 xs-title-small title-medium">
                Title sponsor
              </h3>
              <div className="row xs-margin-6 xs-no-margin-rl margin-3 no-margin-rl">
                <div className="features-box col-sm-8 col-sm-offset-2">
                  <div className="border border-gray-light border-round box-shadow-yes position-relative">
                    <div className="display-table height-100 no-padding-rl padding-7 width-100">
                      <div className="display-table-cell no-padding-tb padding-8 text-center">
                        <img src="./res/images/sponsors/thc.png" alt="THC" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <h3 className="font-family-alt font-weight-700 letter-spacing-1 xs-title-small title-medium">
                In association with
              </h3>
              <div className="row margin-4 no-margin-rl">
                <div className="features-box col-sm-6">
                  <div className="border border-gray-light border-round box-shadow-yes position-relative">
                    <div className="display-table height-100 no-padding-rl padding-7 width-100">
                      <div className="display-table-cell no-padding-tb padding-8">
                        <div className="text-center">
                          <img
                            src="./res/images/sponsors/jamia_cooperative.jpg"
                            alt="Jamia Cooperative Bank"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="features-box col-sm-6 xs-margin-6 xs-no-margin-bottom xs-no-margin-rl">
                  <div className="border border-gray-light border-round box-shadow-yes position-relative">
                    <div className="display-table height-100 no-padding-rl padding-7 width-100">
                      <div className="display-table-cell no-padding-tb padding-8">
                        <div className="text-center">
                          <img
                            src="./res/images/sponsors/al-bake.png"
                            alt="Al-Bake"
                          />
                        </div>
                      </div>
                    </div>
                    <br />

                    <div
                      className="bg-black border-round font-family-alt letter-spacing-1
                    margin-4 padding-tb-9px padding-rl-13px position-absolute
                    position-bottom position-left text-extra-small text-uppercase
                    text-white font-weight-700"
                    >
                      Food Partner
                    </div>
                  </div>
                </div>

                <div className="features-box col-sm-6 xs-margin-6 xs-no-margin-bottom xs-no-margin-rl">
                  <div className="border border-gray-light border-round box-shadow-yes position-relative">
                    <div className="display-table height-100 no-padding-rl padding-7 width-100">
                      <div className="display-table-cell no-padding-tb padding-8">
                        <div className="text-center">
                          <img
                            src="./res/images/sponsors/rupa_aleph.jpg"
                            alt="Rupa and Aleph"
                          />
                        </div>
                      </div>
                    </div>
                    <br />

                    <div
                      className="bg-black border-round font-family-alt letter-spacing-1
                    margin-4 padding-tb-9px padding-rl-13px position-absolute
                    position-bottom position-left text-extra-small text-uppercase
                    text-white font-weight-700"
                    >
                      Gift Partners
                    </div>
                  </div>
                </div>

                <div className="features-box col-sm-6 xs-margin-6 xs-no-margin-bottom xs-no-margin-rl">
                  <div className="border border-gray-light border-round box-shadow-yes position-relative">
                    <div className="display-table height-100 no-padding-rl padding-7 width-100">
                      <div className="display-table-cell no-padding-tb padding-8">
                        <div className="text-center">
                          <img
                            src="./res/images/sponsors/croma_pictures.png"
                            alt="Croma Pictures"
                          />
                        </div>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>

              <br />
              <p className="font-family-alt text-extra-large text-gray-dark-2">
                Our event wouldn't have been possible without the valuable
                contribution from:
              </p>
              <div className="row xs-margin-6 xs-no-margin-rl margin-3 no-margin-rl">
                <div className="features-box col-sm-6 col-sm-offset-3">
                  <div className="border border-gray-light border-round box-shadow-yes position-relative">
                    <div className="display-table height-100 no-padding-rl padding-7 width-100">
                      <div className="display-table-cell no-padding-tb padding-8">
                        <a
                          href="http://jmi.ac.in/aboutjamia/centres/innovationentr-epreneurship/introduction"
                          className="display-block text-center"
                          target="_blank"
                        >
                          <img
                            src="./res/images/sponsors/cie-jmi.jpg"
                            alt="CIE, JMI"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <span className="bg-gray-light-2 separator-line-full xs-margin-12 xs-no-margin-rl margin-6 no-margin-rl" />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 text-center">
              <h3 className="display-block font-weight-300 letter-spacing-1 xs-title-small title-large">
                Looking for sponsorship opportunities at TEDx JMI?
              </h3>
              <br />
              <p className="text-gray-dark-2 xs-text-extra-large title-small">
                Drop us an e-mail or give us a call, and let's talk!
              </p>
              <br />
              <div className="row">
                <div className="col-xs-12 col-sm-6 display-inline-block">
                  <i className="fa fa-envelope-o display-block text-base-color title-extra-large" />
                  <span className="display-block margin-5 no-margin-bottom no-margin-rl text-gray-dark-2 xs-text-extra-large title-small">
                    tedxjmi2017@gmail.com
                  </span>
                </div>

                <div className="col-xs-12 col-sm-6 display-inline-block xs-margin-12 xs-no-margin-rl xs-no-margin-bottom">
                  <i className="fa fa-phone display-block text-base-color title-extra-large" />
                  <span className="display-block margin-5 no-margin-bottom no-margin-rl text-gray-dark-2 xs-text-extra-large title-small">
                    +91 990 534 4182
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Sponsors;