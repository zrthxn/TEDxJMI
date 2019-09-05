import React, { Component } from 'react'

export default class Terms extends Component {
  render() {
    return (
      <article>
        <h1>Terms and Conditions</h1>
        <section>
          <p>
            You agree to the following terms and conditions while registering.
          </p>

          <div style={{ textAlign: 'left', padding: '2em', maxWidth: 800, margin: 'auto' }}>
            <h3>Registration</h3>
            <ul>
              <li>By registering and making a payment you agree that all details provided are accurate. Any discrepancy found later may result in cancellation of registration.</li><br/>
              <li>Cancellation and rescheduling of registration are not allowed.</li><br/>
              <li>All tickets are non-refundable, non-transferable and is valid for one attendee only.</li><br/>
              <li>Holder of any duplicate or forged passes/badges/tickets will be handed over to the security and/or police personnel. Forging passes is a criminal offence.</li><br/>
            </ul>
              
            <h3>Venue</h3>
            <ul>
              <li>We urge you to mark your presence at the venue 45 minutes prior to event timing to carry out necessary verification.</li><br/>
              <li>All attendees must carry e-ticket or its printout for verification at the venue.</li><br/>
              <li>Please carry a valid government identity card to attain a conference attendee badge at the venue. Eg: Aadhar card, Voter ID, PAN card, etc.</li><br/>
              <li>The attendees must wear their conference badge throughout the conference across all venues.</li><br/>
              <li>Seat numbers will be allotted to each confirmed and verified attendee at the entrance.</li><br/>
              <li>Entry into the auditorium will only start 30 minutes before the event timing.</li><br/>
              <li>The auditorium doors will remain shut during sessions and will not open for entry.</li><br/>
              <li>Attendees reaching late at the venue will not be allowed inside the auditorium while the sessions are in progress.</li><br/>
              <li>There will be a simulcast area to view live proceedings in the venue foyer area.</li><br/>
              <li>Re-entry into the venue is strictly prohibited. Attendees will have to submit event badge to the security at exit. The same will not be given back.</li><br/>
            </ul>
            
            <h3>Solicitation</h3>
            <ul>
              <li>The organisers reserve the rights of frisk and restrict entry.</li><br/>
              <li>Please cooperate with the private security and police personnel or any agencies for security checks.</li><br/>
              <li>Any individual might be asked to leave the venue without any liability of a refund if there is any behavioural misdemeanour. This decision rests with the conference and venue management and is final and binding.</li><br/>
              <li>No Flash Photography or video recording at the venue is permitted, under any circumstances.</li><br/>
              <li>Carrying of food items, alcohol, cigarettes, weapons, inflammable and banned substances are strictly prohibited.</li><br/>
              <li>The organiser does not take any responsibility for injuries, loss or theft of any personal belongings of the ticket holder.</li><br/>
              <li>There will be adequate breaks for networking and refreshments.</li><br/>
              <li>No children under the age of 15 will be allowed at the venue unaccompanied.</li><br/>
              <li>All standard venue and attendee rules are to be adhered to by attendees.</li><br/>
            </ul>
          </div>
        </section>
      </article>
      
    )
  }
}
