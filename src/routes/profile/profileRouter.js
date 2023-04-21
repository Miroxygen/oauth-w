import express from 'express'
import { checkifAuthenticated } from '../../middleware/authMiddleware.js'

export const router = express.Router()

const resolveProfileController = (req) => req.app.get('container').resolve('ProfileGitLabController')

router.get('/', checkifAuthenticated, async (req, res, next) => {
    await resolveProfileController(req).displayProfile(req, res)
  })

