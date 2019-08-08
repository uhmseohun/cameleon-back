import { Router } from 'express'

import axios from 'axios'

const router = Router()

router.get('/', async (req, res, next) => {
  function command (command) {
    axios.get(`https://us-central1-luna-ai-secretary.cloudfunctions.net/addInQueue/${command}`)
  }

  const no = parseInt(req.body.tag)

  if (no === 1) command('r')
  if (no === 2) command('g')
  if (no === 3) command('b')

  res.status(204).end()
})

export default router
