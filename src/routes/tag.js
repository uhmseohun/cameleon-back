import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import models from '@/models'

const router = Router()

router.get('/', async (req, res, next) => {
  res.json({
    tags: await models.Tag.find({})
  })
})

export default router
