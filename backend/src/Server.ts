import express from 'express'
import { text } from './utils'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(text+'holoahoaa')
})

app.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }
  return console.log(`Server is listening on ${port}`)
})
