import { Router } from 'express'

import { check, validationResult } from 'express-validator'

import models from '@/models'
import responses from '@/utils/responses'

const router = Router()

function checkPermission (klass, user) {
  if (user.type === 'a') return true
  else if (user.type === 's') {
    return klass.students.includes(user._id)
  } else { // teacher
    return user.class.includes(klass._id)
  }
}

router.get('/', (req, res, next) => {
  models.Class.find({})
    .then(r => {
      r = r.filter(v => checkPermission(v, req.user))
      res.json({
        classes: r
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

router.delete('/:classId', async (req, res, next) => {
  const classId = req.params.classId

  const klass = await models.Class.findById(classId)

  if (!klass) return next(responses.classNotExist)
  if (!checkPermission(klass, req.user)) {
    return next(responses.noPermission)
  }

  klass.delete()
    .then(() => res.status(204).end())
    .catch(e => next(e))
})

export default router
