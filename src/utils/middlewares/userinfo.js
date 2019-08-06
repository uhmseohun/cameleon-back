import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const token = req.headers.authorization

  const user = jwt.decode(token, req.app.get('jwtsecret'))

  req.user = user

  next()
}
