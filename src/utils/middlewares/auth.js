import jwt from 'jsonwebtoken'
import responses from '@/utils/responses'

export default async (req, res, next) => {
  const url = req.originalUrl; const token = req.headers.authorization

  console.log(url)
  if (url.includes('/auth')) return next()

  if (!token) return next(responses.needAuth)

  try {
    await jwt.verify(token, req.app.get('jwtsecret'))
    next()
  } catch (e) {
    return next(e)
  }
}
