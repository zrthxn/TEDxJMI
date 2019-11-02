import express from 'express'
import crypto from 'crypto'
import Firestore from '../utils/Database'
import { encrypt } from '../utils/Encryption'

export const PaymentsRouter = express.Router()

require('dotenv').config()

const ServerConfig = require('../../assets/config.json')
const { basePrice, txnFee, taxRate } = ServerConfig.tickets

PaymentsRouter.use((req, res, next)=>{
  if(process.env.REGISTERATION_OPEN!=='YES')
    return res.status(200).send('Registrations Closed')
  next()
})

PaymentsRouter.post('/create', (req, res)=>{ 
  const { user } = req.body
  const transaction = {
    user,
    baseAmount: undefined,
    discountPercentApplied: undefined,
    taxPercent: undefined,
    amountPaid: undefined,
    status: 'PENDING'
  }
  
  Firestore.collection('Tickets').where('email', '==', user.email)
    .get()
    .then(async (searchResults)=>{
      if(searchResults.docs.length!==0) 
        throw new Error("User Already Exists")
      
      transaction.baseAmount = basePrice

      // const internal = await Firestore.collection('Coupons').where('couponCode', '==', 'JMISTD').limit(1).get()

      // if(user.isInternalStudent && user.studentIdNumber!==undefined && user.studentIdNumber!=='') {
      //   if(internal.docs!==undefined && internal.docs.length > 0) {
      //     const coupon = internal.docs[0].data()

      //     if(coupon!==undefined && coupon!==null)
      //       if(coupon.maxUses>0) {
      //         transaction.baseAmount = internalDiscountAmount
      //         user.couponCode = 'JMISTD'
      //       }
      //   }
      // }
      // else
      //   user.isInternalStudent = false
        
      const query = await Firestore.collection('Coupons').where('couponCode', '==', user.couponCode).limit(1).get()
      
      if(query.docs!==undefined && query.docs.length > 0) {
        const coupon = query.docs[0].data()

        if(coupon!==undefined && coupon!==null) {
          if(coupon.maxUses!==0)
            transaction.discountPercentApplied = coupon.discount
          else
            transaction.discountPercentApplied = 0
        }
        else
          transaction.discountPercentApplied = 0  
      }
      else
        transaction.discountPercentApplied = 0

      transaction.taxPercent = taxRate * 100

      // CRUCIAL --------------------------------
      transaction.amountPaid = Math.ceil((transaction.baseAmount * (1 + (taxRate * (1 + txnFee)))) * (1 - transaction.discountPercentApplied/100))
      // ========================================

      Firestore.collection('Mailing List').add({ name: user.name, email: user.email })

      Firestore.collection('Transactions').add(transaction).then((doc)=>{
        transaction['txnid'] = doc.id

        // Set 15 Minutes to Complete Payment
        setTimeout(()=>{
          Firestore.collection('Transactions').doc(doc.id).update({ status: 'TIMEOUT' })
        }, 15 * 60 * 1000)

        res.send({
          transaction,
          encoding: 'hex',
          apiKey: encrypt(process.env.PAYU_KEY),
          salt: encrypt(process.env.PAYU_SALT),
          checksum: crypto.createHash('sha512').update(JSON.stringify(transaction)).digest("base64")
        })
      })
    }).catch((err)=>{
      console.error(err)
      res.status(403).send(err)
    })
})
