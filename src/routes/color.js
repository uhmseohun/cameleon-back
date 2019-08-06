import { Router } from 'express'

import models from '@/models'

const router = Router()

router.get('/', (req, res, next) => {
  models.Color.find({})
    .then(r => res.json({
      colors: r
    }))
})

export default router
