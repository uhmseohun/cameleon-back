import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import models from '@/models'

const router = Router()

router.get('/', async (req, res, next) => {
  res.json({
    subjects: await models.Subject.find({})
  })
})

router.post('/',[
  check('name').isString().not().isEmpty(),
  check('teachers').isArray(),
  check('color').isString()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(errors)

  let newSubject = new models.Subject()
  newSubject = Object.assign(newSubject, req.body)

  newSubject.writer = req.user._id

  newSubject.save()
    .then(r => {
      res.json({
        subject: r
      })
    })
    .catch(e => next(e))
})

// todo: put / delete method of subject

export default router
