const express = require('express')
const app = express()
const db = require('./config/db')
const consign = require('consign')

consign()
  .include('./config/security.js')
  .then('./config/middlewares.js')
  .then('./controllers')
  .then('./routes.js')
  .into(app)

app.db = db

app.listen(3000, () => {
  console.log('Backend rodando...')
})
