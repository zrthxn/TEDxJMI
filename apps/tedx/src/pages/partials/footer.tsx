import React, { Component } from "react";


class Footer extends Component {
  componentDidMount() {
    // (function(d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) return;
    //     js = d.createElement(s);
    //     js.id = id;
    //     js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.10&appId=203606196348015";
    //     fjs.parentNode.insertBefore(js, fjs);
    //     }(document, 'script', 'facebook-jssdk'));
    /* ---------------PROBLEMS WITH THIS-------------------------*/
  }
  render() {
    return (
      <div>
        <section id="event-banner" className="bg-white pull-up">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 text-center">
                <i className="fa fa-clock-o display-block text-base-color title-extra-large-2" />
                <span className="display-block font-family-alt font-weight-700 letter-spacing-1 margin-5 no-margin-bottom no-margin-rl text-large text-uppercase">
                  Date &amp; Time
                </span>
                <p className="margin-3 font-family-alt no-margin-bottom no-margin-rl title-small text-gray-dark-2">
                  October 16, 2017
                  <br />
                  10 AM to 5 PM
                </p>
              </div>

              <div className="col-sm-4 xs-margin-8 xs-no-margin-bottom xs-no-margin-rl text-center">
                <i className="fa fa-map-marker display-block text-base-color title-extra-large-2" />
                <span className="display-block font-family-alt font-weight-700 letter-spacing-1 margin-5 no-margin-bottom no-margin-rl text-large text-uppercase">
                  Venue
                </span>
                <p className="margin-3 font-family-alt no-margin-bottom no-margin-rl title-small text-gray-dark-2">
                  Dr. M. A. Ansari Auditorium,
                  <br />
                  Jamia Millia Islamia
                </p>
              </div>

              <div
                id="banner-registration"
                className="col-sm-4 xs-margin-8 xs-no-margin-bottom xs-no-margin-rl text-center"
              >
                <a
                  href="../../assets/insider_guide.pdf"
                  className="btn btn-outline-base-color sm-btn-medium btn-large no-margin-rl"
                >
                  <span>
                    Download
                    <br />
                    insider guide
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="home-bg-parallax"
          className="height-50 no-padding overflow-hidden width-100"
        >
          <div className="bg-parallax bg-overlay-black-5 width-100" />

          <div className="display-table height-100 position-absolute position-top position-left width-100">
            <div className="display-table-cell vertical-align-middle">
              <div className="container">
                <div className="row">
                  <div className="countdown-timer">
                    <div className="days">
                      <span className="value">00</span>
                      <span className="label">DAYS</span>
                    </div>
                    <div className="hours">
                      <span className="value">00</span>
                      <span className="label">HOURS</span>
                    </div>
                    <div className="minutes">
                      <span className="value">00</span>
                      <span className="label">MINS</span>
                    </div>
                    <div className="seconds">
                      <span className="value">00</span>
                      <span className="label">SEC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer bg-white">
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <div className="footer-logo xs-text-center">
                  <img src="../assets/images/logos/light.png" alt="" />
                </div>

                <p className="disclaimer xs-text-center">
                  This independent TEDx event is operated under license from
                  TED.
                </p>
              </div>

              <div className="col-sm-8">
                <div className="footer-social text-right">
                  <ul className="list-inline list-unstyled no-margin xs-text-center xs-title-small title-medium">
                    <li>
                      <a href="https://facebook.com/tedxjmi">
                        <i className="fa fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/TEDx_JMI">
                        <i className="fa fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="https://instagram.com/tedxjmi">
                        <i className="fa fa-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <a href="#page-top" className="page-scroll scroll-to-top">
          <i className="fa fa-angle-up" />
        </a>
      </div>
    );
  }
}

export default Footer;