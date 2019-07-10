import React, { Component } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/color_red.css";
import "../assets/css/flickity.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/magnific-popup.css";
import "../assets/css/main.css";
import "../assets/css/style.css";

class Register extends Component {
  render() {
    return (
      <div>
        <section id="registration" className="bg-white-2">
          <div className="container">
            <div className="row no-padding-rl">
              <div className="col-md-12">
                <h2 className="font-family-alt font-weight-700 sm-title-large title-extra-large-2 text-gray-dark-2">
                  Register for TEDxJMI
                </h2>
                <span className="bg-base-color xs-margin-6 xs-no-margin-rl margin-3 no-margin-rl separator-line-extra-thick-long" />
              </div>
              Name
            </div>

            <div className="row margin-2 no-margin-rl no-margin-bottom">
              <p className="font-family-alt sm-text-large text-extra-large text-gray-dark-2">
                Before registering, make sure to read and comply to the
                following rules and guidelines regarding the event:
              </p>

              <div className="row">
                <div className="col-sm-6">
                  <div className="display-table height-100 no-padding-rl padding-7 width-100">
                    <div className="display-table-cell no-padding-tb padding-8 vertical-align-middle">
                      <span className="display-block font-weight-700 letter-spacing-1 text-large text-uppercase">
                        Registration
                      </span>
                      Name
                      <span className="bg-base-color display-inline-block margin-3 no-margin-bottom no-margin-rl separator-line-thick" />
                      <span className="display-block margin-2 no-margin-bottom no-margin-rl text-medium text-gray-dark-2">
                        <ol>
                          <li>
                            By registering and making a payment you agree that
                            all details provided are accurate. Any discrepancy
                            may result in cancellation of registration.
                          </li>
                          <li>
                            Cancellation and rescheduling of registration are
                            not allowed.
                          </li>
                          <li>
                            All tickets are non-refundable, non-transferable and
                            is valid for one attendee only.
                          </li>
                          <li>
                            Holder of any duplicate or forged
                            passes/badges/tickets will be handed over to the
                            security and/or police personnel. Forging passes is
                            a criminal offence.
                          </li>
                        </ol>
                      </span>
                      <br />
                      <span className="display-block font-weight-700 letter-spacing-1 text-large text-uppercase">
                        Venue
                      </span>
                      <span className="bg-base-color display-inline-block margin-3 no-margin-bottom no-margin-rl separator-line-thick" />
                      <span className="display-block margin-2 no-margin-bottom no-margin-rl text-medium text-gray-dark-2">
                        <ol>
                          <li>
                            We urge you to mark your presence at the venue 45
                            minutes prior to event timing to carry out necessary
                            verification.
                          </li>
                          <li>
                            All attendees must carry e-ticket or its printout
                            for verification at the venue.
                          </li>
                          <li>
                            Please carry a valid government identity card to
                            attain a conference attendee badge at the venue. Eg:
                            Aadhar card, Voter ID, PAN card, etc.
                          </li>
                          <li>
                            The attendees must wear their conference badge
                            throughout the conference across all venues.
                          </li>
                          <li>
                            Seat numbers will be allotted to each confirmed and
                            verified attendee at the entrance.
                          </li>
                          <li>
                            Entry into the auditorium will only start 30 minutes
                            before the event timing.
                          </li>
                          <li>
                            The auditorium doors will remain shut during
                            sessions and will not open for entry.
                          </li>
                          <li>
                            Attendees reaching late at the venue will <b>not</b>{" "}
                            be allowed inside the auditorium while the sessions
                            are in progress.
                          </li>
                          <li>
                            There will be a simulcast area to view live
                            proceedings in the venue foyer area.
                          </li>
                          <li>
                            Re-entry into the venue is strictly prohibited.
                            Attendees will have to submit event badge to the
                            security at exit. The same will not be given back.
                          </li>
                        </ol>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="display-table height-100 xs-no-padding-top no-padding-rl padding-7 width-100">
                    <div className="display-table-cell no-padding-tb padding-8 vertical-align-middle">
                      <span className="display-block font-weight-700 letter-spacing-1 text-large text-uppercase">
                        Solicitation
                      </span>
                      <span className="bg-base-color display-inline-block margin-3 no-margin-bottom no-margin-rl separator-line-thick" />
                      <span className="display-block margin-2 no-margin-bottom no-margin-rl text-medium text-gray-dark-2">
                        <ol>
                          <li>
                            The organisers reserve the rights of frisk and
                            restrict entry.
                          </li>
                          <li>
                            Please cooperate with the private security and
                            police personnel or any agencies for security
                            checks.
                          </li>
                          <li>
                            Any individual might be asked to leave the venue
                            without any liability of a refund if there is any
                            behavioural misdemeanour. This decision rests with
                            the conference and venue management and is final and
                            binding.
                          </li>
                          <li>
                            No Flash Photography or video recording at the venue
                            is permitted, under any circumstances.
                          </li>
                          <li>
                            Carrying of food items, alcohol, cigarettes,
                            weapons, inflammable and banned substances are
                            strictly prohibited.
                          </li>
                          <li>
                            The organiser does not take any responsibility for
                            injuries, loss or theft of any personal belongings
                            of the ticket holder.
                          </li>
                          <li>
                            There will be adequate breaks for networking and
                            refreshments.
                          </li>
                          <li>
                            No children under the age of 15 will be allowed at
                            the venue unaccompanied.
                          </li>
                          <li>
                            All standard venue and attendee rules are to be
                            adhered to by attendees.
                          </li>
                        </ol>
                      </span>
                      <br />

                      <span className="display-block font-weight-700 letter-spacing-1 text-large text-uppercase">
                        Socialise
                      </span>
                      <span className="bg-base-color display-inline-block margin-3 no-margin-bottom no-margin-rl separator-line-thick" />
                      <span className="display-block margin-2 no-margin-bottom no-margin-rl text-medium text-gray-dark-2">
                        <ol>
                          <li>
                            Use the official hashtag <b>#TEDxJMI</b> on social
                            media to talk about the event.
                          </li>
                          <li>
                            We urge you to carpool to save fuel and get to know
                            fellow attendees before the event.
                          </li>
                          <li>Most importantly, have a great time!</li>
                        </ol>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="bg-gray-light-2 separator-line-full" />

            <div className="row margin-5 no-margin-rl no-margin-bottom">
              <div className="col-md-5 no-padding-rl">
                <div className="row text-center">
                  <h3 className="font-family-alt font-weight-900 letter-spacing-2 text-uppercase xs-title-small title-medium title-sideline-base-color">
                    JMI Students
                  </h3>
                </div>
                <br />
                <p>
                  If you're a student currently studying at JMI, you can
                  register by filling out the form provided at the link below.
                </p>
                <p>
                  The last date of registration for JMI students is October 05.
                </p>
                <div className="margin-8 no-margin-bottom no-margin-rl text-center">
                  <span className="btn btn-outline-base-color sm-btn-medium btn-large no-margin-rl">
                    Registration closed
                  </span>
                </div>
              </div>

              <div className="contact-address col-md-6 col-md-offset-1">
                <div className="row text-center">
                  <h3 className="font-family-alt font-weight-900 letter-spacing-2 text-uppercase xs-title-small title-medium title-sideline-base-color">
                    Others
                  </h3>
                </div>
                <br />
                <p>
                  Please visit the link below to proceed with the registration
                  process.
                </p>
                <div className="margin-5 no-margin-bottom no-margin-rl text-center">
                  <span className="btn btn-outline-base-color sm-btn-medium btn-large no-margin-rl">
                    Registration closed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Register;