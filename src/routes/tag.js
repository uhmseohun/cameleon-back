import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import models from '@/models'

const router = Router()

router.get('/', async (req, res, next) => {
  res.json({
    tags: await models.Tag.find({})
  })
})

router.post('/', [
  check('name').isString().not().isEmpty(),
  check('payload').isNumeric().not().isEmpty(),
  check('color').isString().not().isEmpty()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(errors)

  let newTag = new models.Tag()
  newTag = Object.assign(newTag, req.body)

  newTag.save()
    .then(r => {
      res.json({
        tag: r
      })
    })
    .catch(e => next(e))
})

export default router
