import React, { Component } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/color_red.css";
import "../assets/css/flickity.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/main.css";
import "../assets/css/style.css";

// Netlify form
class Alumni extends Component {
  render() {
    return (
      <section id="alumni" className="bg-white">
        <div className="container">
          <div className="row no-padding-rl">
            <div className="col-md-10 col-md-offset-1">
              <h2 className="font-family-alt font-weight-700 sm-title-large title-extra-large-2 text-gray-dark-2">
                Alumni of JMI
              </h2>
              <span className="bg-base-color xs-margin-6 xs-no-margin-rl margin-3 no-margin-rl separator-line-extra-thick-long" />

              <br />
              <div className="text-gray-dark-2">
                <p>
                  TEDx is a platform for people to witness remarkable ideas,
                  firsthand. We're excited to be a licensee and are reaching out
                  to our alumni who we believe are committed to the power of
                  ideas to support our TEDx event. Individuals like you are our
                  university's lasting legacy and strongest voice. As a
                  successful role model, you reent what we aspire to become:
                  professional, efficient and charitable, making a positive
                  impact on the community. We, at JMI, are finding new ways to
                  build an engagement and we feel, for you to join our event is
                  one of the easiest ways to reconnect, give back to the
                  University, and serve as a springboard for further
                  involvement. We believe, whatever you did at JMI, wherever you
                  are in your career, your support can make a big difference to
                  the ongoing success of our event and JMI. For you, lending a
                  helping hand to us will not only allow you to take part in and
                  experience our event but also help transform today’s students
                  into tomorrow’s leaders. These students are indeed the future
                  leaders of the world and helping them achieve their goals can
                  only benefit people like you in the near future.
                </p>

                <p>
                  We are looking forward to discussing ways in which you could
                  help underwrite and add to this incredible new experience.
                  Your involvement will make this event a special and successful
                  celebration.
                </p>

                <p>
                  Please enter your particulars and we'll get in touch to find
                  opportunities for your contribution in TEDxJMI.
                </p>
              </div>
            </div>
          </div>

          <div className="row margin-5 no-margin-rl no-margin-bottom">
            <div className="col-md-10 col-md-offset-1">
              <form name="alumni" action="thank-you" method="post">
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </div>

                  <div className="col-sm-6">
                    <input
                      type="text"
                      placeholder="Contact number"
                      name="phone"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Course and Batch"
                      name="course-and-batch"
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-8 col-sm-offset-2">
                    <textarea
                      placeholder="Your Message"
                      name="message"
                      required
                    />
                  </div>
                </div>

                <div className="row text-center">
                  <button
                    type="submit"
                    className="btn btn-base-color btn-medium"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Alumni;