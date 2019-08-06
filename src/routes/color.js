import { Router } from 'express'

import { check, validationResult } from 'express-validator'

import models from '@/models'

const router = Router()

function checkPermission (color, user) {
  if (user.type === 'a') return true
  return color.writer == user._id // todo: implement objectid to string method
}

router.get('/', (req, res, next) => {
  models.Color.find({})
    .then(r => res.json({
      colors: r
    }))
})

router.post('/', [
  check('name').isString().not().isEmpty(),
  check('introduce').isString().not().isEmpty(),
  check('rgb').isString().not().isEmpty().isLength({ min: 6, max: 6 }),
  check('kelvin').isNumeric().not().isEmpty()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(errors)

  let newColor = new models.Color()
  newColor = Object.assign(newColor, req.body)
  newColor.writer = req.user._id

  newColor.save()
    .then(r => res.json({
      color: r
    })).catch(e => next(e))
})

export default router
