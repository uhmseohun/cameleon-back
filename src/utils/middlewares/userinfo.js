import jwt from 'jsonwebtoken'
import models from '@/models'
import responses from '@/utils/responses'

export default (req, res, next) => {
  const token = req.headers.authorization

  const user = jwt.decode(token, req.app.get('jwtsecret'))

  req.user = user
  
  next()
}
