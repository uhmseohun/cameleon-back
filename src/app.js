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

app.use('/auth', routes.auth)
app.use('/class', routes.class)
app.use('/color', routes.color)
app.use('/subject', routes.subject)
app.use('/user', routes.user)

app.use(bodyParser)
app.use(cors)

// routes here

export default app
