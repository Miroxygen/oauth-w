import express from 'express'
import { checkifNotAuthenticated } from '../../middleware/authMiddleware.js'
import 'dotenv/config'

export const router = express.Router()

const resolveAuthController = (req) => req.app.get('container').resolve('AuthenticationController')

router.get('/auth/gitlab', checkifNotAuthenticated, (req, res) => {
  resolveAuthController(req).authenticateTowardsGitLabWithOaut(req, res)
})

router.get('/auth/gitlab/callback', checkifNotAuthenticated, async (req, res, next) => {
  await resolveAuthController(req).handleCallBack(req, res, next)
})


router.get('/', checkifNotAuthenticated, (req, res, next) => {
  res.render('auth')
  })

