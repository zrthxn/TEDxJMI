import express from 'express'
import Firestore from '../utils/Database'

export const PaymentsRouter = express.Router()

PaymentsRouter.post('/create', (req, res)=>{ 
  const { data } = req.body

  const transaction = {
    txnid: '1234567890',
    baseAmount: 10.00,
    discountPercentApplied: 2.50,
    taxPercent: 5.0,
    amountPaid: 7.875
  }

  /** 
   * @todo
   * Verify data, verify coupon code
   * Calculate tax and total amount etc
   */

  /**
   * @todo
   * Check all parameters, validate
   * Create a new entry in the DB in "Transactions"
   * Create a unique txnid
   * Return the txnid along with KEY and SALT
   */

  res.send({
    apiKey: process.env.PAYU_KEY,
    salt: process.env.PAYU_SALT,
    transaction
  })
})

PaymentsRouter.post('/verify', (req, res)=>{
  // Webhook from PayU
  /**
   * @todo
   * Find ticket by TxnID and set
   *  verified: true
   * 
   * If status is failed, send email to User and Admin
   */
})

PaymentsRouter.put('/refund', (req, res)=>{
  /**
   * @todo
   * Take Ticket ID, find ticket
   * Find TXNID, check when it was done
   * If within past one week, refund 85% of net amount
   * Else deny refund
   */
})
