import express from 'express'

const server = express()
const port = 3000

server.listen(port, (err) => {
  if (err) return console.error(err)
  console.log(`Server is listening on ${port}`)
})
// --------------------------------------------------------

/**
 * @description
 * Router
 */

const router = express.Router()

import { RegisterRouter } from './routes/Register'
import { PaymentsRouter } from './routes/Payments'

router.use((req, res, next) => {
  // csrf
  next()
})

router.use('/_payments', PaymentsRouter)

router.use('/_register', RegisterRouter)
