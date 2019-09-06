import express from 'express'
// import Firestore from '../utils/Database'
require('dotenv').config()

export const RegisterRouter = express.Router()

RegisterRouter.post('/user', (req, res)=>{
  const { userdata } = req.body

  // Firestore.collection('Users').where('email', '==', userdata.email)
  //   .get().then((searchResults)=>{
      // for (const user of searchResults) {
        /**
         * @todo
         * If email exists, don't allow
         * 1. Add user data to Firestore
         * 2. Add email to mailing list
         * 3. Send welcome email 
         */
      // }
      // Firestore.collection('Users').add({
      //   name: userdata.name,
      //   email: userdata.email
      // }).then((doc)=>{
      //   res.send({
      //     _id: doc.id,
      //     name: userdata.name,
      //     email: userdata.email
      //   })
      // })

      // Firestore.collection('Mailing List').add({
      //   name: userdata.name,
      //   email: userdata.email
      // })
    // })

  res.send({
    _id: '1234567890',
    name: userdata.name,
    email: userdata.email
  })
})

RegisterRouter.post('/ticket', (req, res)=>{
  const { data } = req.body

  /**
   * @todo
   * Add confirmed ticket to database
   */

  /**
   * @todo
   * Add payment data and user data to DB in a "Ticket"
   * Assign unique ticket ID
   */

  res.send({
    ticketId: 'asdfghjkl'
  })
})
