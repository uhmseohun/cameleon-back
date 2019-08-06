import { Router } from 'express'

import { check, validationResult } from 'express-validator'

import models from '@/models'

const router = Router()

router.get('/', (req, res, next) => {
  models.Class.find({})
    .then(r => {
      r = r.filter(v => {
        return v.students.includes(req.user._id) ||
          req.user.class.includes(v._id)
      })
    }).catch(e => next(e))
})

router.post('/', [
  check('name').isString().not().isEmpty(),
  check('introduce').isString().not().isEmpty(),
  check('grade').isNumeric(),
  check('class').isNumeric(),
  check('students').isArray(),
  check('president').isArray(),
  check('colors').not().isEmpty() // todo: verify isObject??
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(errors)

  let newClass = new models.Class()
  newClass = Object.assign(newClass, req.body)

  newClass.save()
    .then(r => {
      res.json({
        class: r
      })
    }).catch(e => next(e))
})

router.put('/:classId', (req, res, next) => {

})

router.delete('/:classId', (req, res, next) => {

})

export default router
