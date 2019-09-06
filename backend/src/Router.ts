import express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

/**
 * @description
 * API Router
 */

export const router = express.Router()

const ServerConfig = require('../assets/config.json')

import { RegisterRouter } from './routes/Register'
import { PaymentsRouter } from './routes/Payments'

router.use((req, res, next)=>{
  // CSRF
  console.log(req.headers['X-Access-Key'])
  console.log(req.headers['X-Access-Token'])
  // res.sendStatus(200)
  next()
})

router.use('/_payments', PaymentsRouter)

router.use('/_register', RegisterRouter)
