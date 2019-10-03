import express from 'express'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import Firestore from '../utils/Database'
import Gmailer from '../utils/Gmailer'
import GSheets from '../utils/GSheets'

require('dotenv').config()

export const RegisterRouter = express.Router()

RegisterRouter.use((req, res, next)=>{
  if(process.env.REGISTERATION_OPEN!=='YES')
    return res.status(200).send('Registrations Closed')
  next()
})

RegisterRouter.post('/ticket', async (req, res)=>{
  const { user, txn, checksum } = req.body
  const Gmail = new Gmailer()
  const GSheet = new GSheets()

  var ticketId = 'TEDXJMI'
  ticketId += Date.now().toString(36).toUpperCase()

  const hash = crypto.createHash('sha512').update(JSON.stringify(user)).update(JSON.stringify(txn)).digest('base64')
  if(hash!==checksum)
    return res.status(403).send({ status: 'AUTH_FAILED' })
  
  txn.status = 'SUCCESSFUL'
  await Firestore.collection('Transactions').doc(txn.txnid).update({ status: 'SUCCESSFUL' })
  await Firestore.collection('Tickets').doc(ticketId).set({ user, txn })

  fs.readFile(
    path.join(__dirname, '..', '..', 'assets', 'templates', 'confirmation.html'),
    (err, content)=>{
      if(err) return console.error(err)

      Gmail.SingleDataDelivery(
        {
          to: user.email,
          from: 'noreply@tedxjmi.org'
        },
        content.toString(),
        [
          { id: 'name', data: user.name },
          { id: 'ticket', data: ticketId }
        ]
      )
    }
  )
  GSheet.AppendToSpreadsheet([{
    ssId : "1VvZkzG3Sg2fersliG33RVGnFA7QwAfu8-3uT3ZTtfPc",
    sheet: "TICKETS",
    values: [user.name, user.email, user.phone, 
              user.instituion, user.createdOn, 
              user.isInternalStudent, user.studentIdNumber,
              user.couponCode]
  }])

  res.send({ ticketId, status: 'AUTH_PASSED' })
})
