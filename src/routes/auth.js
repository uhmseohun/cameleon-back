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
  check('id').isString().not().isEmpty(),
  check('password').isString().not().isEmpty(),
  check('name').isString().not().isEmpty()
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
          name: r.name
        }
      })
    }).catch(e => next(e))
})

/**
 * @summary 아이디와 패스워드를 받아 유저 인증 후 토큰을 생성해 반환함
 */
router.post('/login', [
  check('id').isString().not().isEmpty(),
  check('password').isString().not().isEmpty()
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return next(errors)

  let hashedPw = crypto.createHash('sha512')
  hashedPw.update(req.body.password)
  hashedPw = hashedPw.digest('base64')

  models.User.findOne({ id: req.body.id, password: hashedPw })
    .then(r => {
      if (!r) return next(responses.checkAccount)

      const accessToken = jwt.sign({
        _id: r._id,
        id: r.id,
        name: r.name,
        subject: r.subject
      }, req.app.get('jwtsecret'), {
        expiresIn: 60 * 60 * 24
      })

      res.json({
        accessToken
      })
    })
    .catch(e => next(e))
})

export default router
