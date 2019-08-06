import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import crypto from 'crypto'
import models from '@/models'
import jwt from 'jsonwebtoken'
import responses from '@/utils/responses'

const router = Router()

/**
 * @summary 회원 정보를 받아 유저를 생성함
 */
router.post('/join', [
  check(['id']).isString().not().isEmpty(),
  check('password').isString().not().isEmpty(),
  check('name').isString().not().isEmpty(),
  check('type').isString().isLength({ min: 1, max: 1 })
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(errors)

  // sha512로 해싱 후 base64로 저장
  let hashedPw = crypto.createHash('sha512')
  hashedPw.update(req.body.password)
  hashedPw = hashedPw.digest('base64')

  req.body.password = hashedPw

  // todo: attach salt to password

  let newUser = new models.User()
  newUser = Object.assign(newUser, req.body)
  newUser.save()
    .then(r => {
      res.json({
        user: {
          id: r.id,
          name: r.name,
          type: r.type
        }
      })
    }).catch(e => next(e))
})

router.post('/join', (req, res, next) => {

})

export default router
