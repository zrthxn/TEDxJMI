import express from 'express'
import Firestore from '../utils/Database'
require('dotenv').config()

export const RegisterRouter = express.Router()

RegisterRouter.post('/user', (req, res)=>{
  const { userdata } = req.body

  Firestore.collection('Users').where('email', '==', userdata.email)
    .get()
    .then((searchResults)=>{
      if(searchResults.docs.length!==0) 
        throw Error("User Already Exists")

      const User = {
        name: userdata.name,
        email: userdata.email,
        createdOn: Date()
      }

      Firestore.collection('Mailing List').add(User)
      
      Firestore.collection('Users').add(User)
        .then((doc)=>{
          res.send({
            _id: doc.id,
            ...User
          })
        })
    })
    .catch(()=>{
      res.sendStatus(403)
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
