import express from 'express'

import bodyParser from 'body-parser'
import cors from 'cors'

import mongoose from 'mongoose'

import routes from '@/routes'
import utils from '@/utils'

const app = express()

mongoose.connect('mongodb://localhost:27017/cameleon',
  { useNewUrlParser: true },
  error => {
    if (error) console.error(utils.messages.dbError)
  })

app.use(utils.middlewares.auth)

app.use('/auth', routes.Auth)
app.use('/class', routes.Class)
app.use('/color', routes.Color)
app.use('/subject', routes.Subject)
app.use('/user', routes.User)

app.use(bodyParser)
app.use(cors)

// routes here

export default app
