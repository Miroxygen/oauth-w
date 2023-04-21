import express from 'express'
import { checkifAuthenticated } from '../../middleware/authMiddleware.js'
import 'dotenv/config'

export const router = express.Router()

const resolveActivityController = (req) => req.app.get('container').resolve('ActivityController')


router.get('/', checkifAuthenticated, async (req, res, next) => {
    await resolveActivityController(req).displayActivites(req, res)
  })