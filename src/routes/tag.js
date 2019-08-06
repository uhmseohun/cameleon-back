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

router.get('/:payload', async (req, res, next) => {
  function hexToRgb (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const tag = await models.Tag.findOne({ payload: req.params.payload })
  const rgb = hexToRgb((await models.Color.findById(tag.color)).rgb)

  res.send(`${rgb.r}, ${rgb.g}, ${rgb.b}`).end() // for aduino
})

export default router
