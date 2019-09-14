import express from 'express'
import path from 'path'
import fs from 'fs'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import crypto, { randomBytes } from 'crypto'
import Gmailer from './utils/Gmailer'
import GSheets from './utils/GSheets'

require('dotenv').config()

/**
 * @authors
 * Alisamar Husain | @zrthxn
 * Azim Javed | @AzimJaved
 * 
 * @copyright 2019
 * Copyright TEDxJMI
 * 
 * @license MIT
 * This software is provided as-is with no
 * warranties or guatantees.
 */

const server = express()

const ServerConfig = require('../assets/config.json')
const { PORT } = ServerConfig || 4000

// server.use(cookieParser())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.listen(PORT, async (err) => {
  if (err) return console.error(err)
  console.log(`Starting on ${PORT}`)

  console.log('Recalculating security values')
  const GENERATOR = crypto.randomBytes(64).toString('base64')
  const SECRET = crypto.randomBytes(256).toString('base64')

  ServerConfig.security = { GENERATOR, SECRET }

  fs.readFile(path.join(__dirname, '..', 'assets', 'config.json'), (ser, data) => {
    if (ser) return console.error(ser)

    data = JSON.parse(data.toString())

    data['security'] = { GENERATOR, SECRET }
    fs.writeFile(path.join(__dirname, '..', 'assets', 'config.json'), JSON.stringify(data, null, 2), () => { })
  })

  console.log('Listening')

  const Gmail = new Gmailer()
  const gmail = await Gmail.TestGmailer()
  console.log('Done', gmail.success)

  const Sheets = new GSheets()
  const sheets = await Sheets.TestGSheets()
  console.log('Done', sheets.success)
})

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ServerConfig.policy.ALLOW_ORIGIN)
  res.header('Access-Control-Allow-Headers', ServerConfig.policy.ALLOW_HEADERS)
  res.header('Access-Control-Allow-Methods', ServerConfig.policy.ALLOW_METHODS)
  next()
})

// --------------------------------------------------------

import { RegisterRouter } from './routes/Register'
import { PaymentsRouter } from './routes/Payment'
import Firestore from './utils/Database'

server.post('/_authenticate', (req, res) => {
  const { clientId, apiKey } = req.body
  const { GENERATOR, SECRET } = ServerConfig.security

  if (apiKey !== undefined)
    if (apiKey !== crypto.createHmac('sha256', clientId).update(process.env.CLIENT_KEY).digest('base64'))
      return res.status(403).send('ERR_INVALID_APIKEY')

  const random = crypto.randomBytes(32).toString('base64')
  const authToken = crypto.createHmac('sha512', SECRET).update(GENERATOR).update(random).digest('base64')

  res.send({
    key: random,
    token: authToken
  })
})

server.use((req, res, next) => {
  /**
   * @description Security Middleware
   */
  const { GENERATOR, SECRET } = ServerConfig.security

  let random = req.headers['x-request-validation']
  const token = req.headers['authorization']

  if (random === undefined)
    return res.send('Request Authentication Failed')

  random = random.toString()
  const hash = crypto.createHmac('sha512', SECRET).update(GENERATOR).update(random).digest('base64')

  if (hash === token)
    next()
  else
    res.send('Request Authentication Failed')
})

// Website and API Router
server.use('/_payments', PaymentsRouter)

server.use('/_register', RegisterRouter)

server.post('/_contact', (req, res) => {
  // let data = req.body
  // mailer.SingleDelivery({
  //   from: ServerConfig.Gmail.username,
  //   to: ServerConfig.Gmail.username,
  //   subject: 'Contact Form | ' + snapshot.docs[index].data().name + ' | ' + data.name,
  //   replyTo: data.email,
  //   body: `
  //         <b>---------------- Contact Form Message ----------------</b> <br><br>
  //         Name: ${data.name} <br> Email: ${data.email}<br><br>
  //         Message: ${data.message}<br><br>
  //         <b>------------------- End of Message -------------------</b> <br><br>
  //       `
  // }).then(() => {
    res.sendStatus(200)
  // })
})

server.use((req, res) => {
  // End any caught requests if no matching paths are found
  res.end('Request Forcefully Closed')
})
