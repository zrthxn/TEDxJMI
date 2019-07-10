import React, { Component } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/color_red.css";
import "../assets/css/flickity.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/main.css";
import "../assets/css/style.css";

// Need to check netlify and form
class Contact extends Component {
  render() {
    return (
      <div>
        <section id="contact" className="bg-white-2">
          <div className="container">
            <div className="row no-padding-rl">
              <div className="col-md-12">
                <h2 className="font-family-alt font-weight-700 sm-title-large title-extra-large-2 text-gray-dark-2">
                  Contact Us
                </h2>
                <span className="bg-base-color xs-margin-6 xs-no-margin-rl margin-3 no-margin-rl separator-line-extra-thick-long" />
              </div>
              Name
            </div>

            <div className="row margin-4 no-margin-rl no-margin-bottom">
              <div className="col-md-5 no-padding-rl">
                <div className="row text-center">
                  <i className="fa fa-envelope-o display-block text-base-color title-extra-large-2" />
                  <br />
                  <h4 className="font-weight-300 letter-spacing-1">
                    tedxjmi2017@gmail.com
                  </h4>
                </div>

                <p className="margin-8 no-margin-bottom no-margin-rl font-family-alt text-extra-large">
                  Send us your queries by email.
                  <br />
                  We endeavour to answer them all within 24 hours.
                </p>

                <br />
                <form
                  name="contact"
                  action="thank-you"
                  method="post"
                  id="form-contact"
                >
                  <div className="row margin-4 no-margin-rl">
                    <input
                      type="text"
                      placeholder="Your Name"
                      name="name"
                      className="required"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      name="email"
                      className="required email"
                      required
                    />
                    <textarea
                      placeholder="Your Message"
                      name="message"
                      className="required"
                      required
                    />
                  </div>

                  <div className="row margin-4 no-margin-rl">
                    <span className="display-block font-family-alt letter-spacing-1 text-gray-dark-2 text-small text-uppercase">
                      * Please enter all fields correctly
                    </span>
                  </div>

                  <div className="row margin-4 no-margin-rl">
                    <button
                      id="btn-form-contact"
                      type="submit"
                      className="btn btn-base-color btn-medium"
                    />
                    Send Message
                  </div>
                </form>
              </div>

              <div className="contact-ads col-md-6 col-md-offset-1">
                <div className="row text-center">
                  <i className="fa fa-map-marker display-block text-base-color title-extra-large-2" />
                  <span className="display-block font-family-alt font-weight-700 letter-spacing-1 margin-5 no-margin-bottom no-margin-rl text-large text-uppercase">
                    Our Location
                  </span>
                  <br />
                  <h4 className="font-weight-300 letter-spacing-1">
                    Jamia Millia Islamia
                    <br />
                    Maulana Mohammad Ali Jauhar Marg
                    <br />
                    Jamia Nagar
                    <br />
                    New Delhi 110025
                  </h4>
                </div>

                <div className="row text-center">
                  <div className="margin-8 no-margin-bottom no-margin-rl map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2906312479427!2d77.28254455362033!3d28.56103426474026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfb09de6f2e8596e7!2sJamia+Millia+Islamia!5e0!3m2!1sen!2sin!4v1497486772213"
                      frameBorder={0}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Contact;