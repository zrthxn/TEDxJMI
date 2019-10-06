import express from 'express'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import Firestore from '../utils/Database'
import Gmailer from '../utils/Gmailer'
import GSheets from '../utils/GSheets'

require('dotenv').config()

const ServerConfig = require('../../assets/config.json')
const Gmail = new Gmailer()
const Sheets = new GSheets()

export const RegisterRouter = express.Router()

RegisterRouter.use((req, res, next)=>{
  if(process.env.REGISTERATION_OPEN!=='YES')
    return res.status(200).send('Registrations Closed')
  next()
})

RegisterRouter.post('/ticket', async (req, res)=>{
  const { user, txn, checksum } = req.body

  const ticketId = 'TEDXJMI' + Date.now().toString(36).toUpperCase()

  const hash = crypto.createHash('sha512').update(JSON.stringify(user)).update(JSON.stringify(txn)).digest('base64')
  if(hash!==checksum)
    return res.status(403).send({ status: 'AUTH_FAILED' })
  
  txn.status = 'SUCCESSFUL'
  await Firestore.collection('Transactions').doc(txn.txnid).update({ status: 'SUCCESSFUL' })
  await Firestore.collection('Tickets').doc(ticketId).set({ user, txn })

  if(user.isInternalStudent && user.couponCode==='')
    user.couponCode = 'JMISTD'

  const couponQuery = await Firestore.collection('Coupons').where('couponCode', '==', user.couponCode).limit(1).get()
  
  let coupon
  try {
    coupon = couponQuery.docs[0].data()
  } catch (err) {
    coupon = undefined
  }

  if(coupon!==undefined && coupon!==null) {
    if(coupon.maxUses!==0) {
      Firestore.collection('Coupons').doc(couponQuery.docs[0].id).update({ maxUses: (coupon.maxUses - 1)  })
    }
  }

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
  
  Sheets.AppendToSpreadsheet([
    {
      ssId : ServerConfig.spreadsheets.tickets.ssId,
      sheet: ServerConfig.spreadsheets.tickets.sheet, 
      values: [ 
        user.createdOn, ticketId,
        user.name, user.email, user.phone, 
        user.institution, user.isInternalStudent, user.studentIdNumber,
        user.couponCode, txn.baseAmount, txn.discountPercentApplied, 
        txn.status
      ]
    }
  ])

  res.send({ ticketId, status: 'AUTH_PASSED' })
})

RegisterRouter.post('/close', (req, res)=>{
  Gmail.SingleDelivery({
    to: 'team@tedxjmi.org',
    from: 'noreply@tedxjmi.org',
    subject: 'Registrations Auto-Closed',
    body: `
      <h1>Registrations Auto-Closed</h1>
      <p>
        The website registrations have been auto-closed by the app. <br>
        Registrations Closed at: ${req.body.data.regNumber}
      </p>
      <br><br><br>
      <p>
        <i>I am the website server. I am a bot!</i>
      </p>
    `
  })
})
