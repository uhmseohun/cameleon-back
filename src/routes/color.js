import { Router } from 'express'

import { check, validationResult } from 'express-validator'

import models from '@/models'
import responses from '@/utils/responses'

const router = Router()

router.get('/', (req, res, next) => {
  models.Color.find({})
    .then(r => res.json({
      colors: r
    }))
})

router.get('/:colorId', (req, res, next) => {
  const colorId = req.params.colorId

  models.Color.findById(colorId)
    .then(r => {
      if (!r) return next(responses.colorNotExist)
      res.json({
        color: r
      })
    })
    .catch(e => next(e))
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

router.delete('/:colorId', async (req, res, next) => {
  const colorId = req.params.colorId

  const color = await models.Color.findById(colorId)

  if (!color) return next(responses.colorNotExist)

  color.delete()
    .then(() => res.status(204).end())
    .catch(e => next(e))
})

router.put('/:colorId', async (req, res, next) => {
  // todo ...
})

export default router
