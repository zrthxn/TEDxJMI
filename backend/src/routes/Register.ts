import express from 'express'
import crypto from 'crypto'
import Firestore from '../utils/Database'
require('dotenv').config()

export const RegisterRouter = express.Router()

RegisterRouter.post('/ticket', async (req, res)=>{
  const { user, txn, checksum } = req.body

  var ticketId = 'TEDXJMI'
  ticketId += Date.now().toString(36).toUpperCase()

  const hash = crypto.createHash('sha512').update(JSON.stringify(user)).update(JSON.stringify(txn)).digest('base64')
  if(hash!==checksum)
    return res.status(403).send({ status: 'AUTH_FAILED' })
  
  txn.status = 'SUCCESSFUL'
  await Firestore.collection('Transactions').doc(txn.txnid).update({ status: 'SUCCESSFUL' })

  await Firestore.collection('Tickets').doc(ticketId).set({
    user, txn
  })

  res.send({ ticketId, status: 'AUTH_PASSED' })
})
