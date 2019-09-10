import express from 'express'
import Firestore from '../utils/Database'
require('dotenv').config()

export const RegisterRouter = express.Router()

RegisterRouter.post('/ticket', (req, res)=>{
  const { user, txn } = req.body

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
