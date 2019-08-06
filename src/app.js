import express from 'express'

import bodyParser from 'body-parser'
import cors from 'cors'

import mongoose from 'mongoose'

import routes from '@/routes'
import utils from '@/utils'
import models from '@/models'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/cameleon',
  {
    useCreateIndex: true,
    useNewUrlParser: true
  },
  error => {
    if (error) console.error(utils.messages.dbError)
  })

app.use(utils.middlewares.auth)

app.use('/auth', routes.Auth)
app.use('/class', routes.Class)
app.use('/color', routes.Color)
app.use('/subject', routes.Subject)
app.use('/user', routes.User)

app.use((req, res, next) => {
  next(models.Error(404, utils.messages.noEndPoint))
})

app.use((response, req, res, next) => {
  if (response.formatter) {
    let errors = response.errors
      .map(v => v.param)

    errors = errors.filter((v, i) => {
      return i === errors.indexOf(v)
    })

    res.status(400).json({
      message: `${errors.join(', ')} 항목을 확인해주세요`
    })
  } else {
    res.status(response.status || 500).json({
      message: response.message
    })
  }
})

export default app
