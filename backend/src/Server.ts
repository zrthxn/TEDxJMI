import express from 'express'
import path from 'path'
import * as bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import crypto from 'crypto'

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

server.use('/static', express.static(path.join( __dirname, '../../static' )))

server.listen(PORT, (err) => {
  if (err) return console.error(err)
  console.log(`Server listening on ${PORT}`)
})

server.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', ServerConfig.policy.ALLOW_ORIGIN)
  res.header('Access-Control-Allow-Headers', ServerConfig.policy.ALLOW_HEADERS)
  res.header('Access-Control-Allow-Methods', ServerConfig.policy.ALLOW_METHODS)
  next()
})

// --------------------------------------------------------

import { router } from './Router'

server.use('/_authenticate', (req, res)=>{
  const { apiKey } = req.body
  const { GENERATOR, API_SECRET, CSRF_SECRET } = ServerConfig.security
  
  if(apiKey!==undefined)
    if(apiKey!==ServerConfig.clientAPIKey)
      return res.status(403).send('ERR_INVALID_APIKEY')
  
  const csrfToken = crypto.createHash('sha256').update(GENERATOR + '|' + CSRF_SECRET).digest('base64')
  const authToken = crypto.createHash('sha256').update(GENERATOR + '|' + API_SECRET).digest('base64')
  
  res.send({
    csrfToken,
    authToken,
    key: GENERATOR
  })
})

// Website and API Router
server.use(router)

server.use((req, res)=>{
  // End any caught requests if no matching paths are found
  res.write('405 Request Forcefully Closed.\n Your request was caught but did not match any paths.\n')
  res.end()
})
