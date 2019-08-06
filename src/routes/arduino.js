import { Router } from 'express'

import admin from 'firebase-admin'
import models from '@/models'
import serviceAccount from '@/serviceAccountKey.json'
import responses from '@/utils/responses'
import axios from 'axios'

const router = Router()

router.get('/', async (req, res, next) => {
  function command(command){
    axios.get(`https://us-central1-luna-ai-secretary.cloudfunctions.net/addInQueue/${command}`)
  }

  function hexToRgb (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   databaseURL: 'https://luna-ai-secretary.firebaseio.com'
  // })

  const no = req.body.tag
  let tag

  if (no == 1) tag = await models.Tag.findById('5d49e403ea8d142555a62132')
  if (no == 2) tag = await models.Tag.findById('5d49e411ea8d142555a62133')
  if (no == 3) tag = await models.Tag.findById('5d49e41eea8d142555a62134')

  if (!tag) return next(responses.tagNotExist)

  const rgb = hexToRgb((await models.Color.findById(tag.color)).rgb)

  command(`${rgb.r}, ${rgb.g}, ${rgb.b}`)

  res.end(`${rgb.r}, ${rgb.g}, ${rgb.b}`)
})

export default router
