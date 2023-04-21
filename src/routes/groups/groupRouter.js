import express from 'express'
import 'dotenv/config'
import { checkifAuthenticated } from '../../middleware/authMiddleware.js'


export const router = express.Router()

const resolveGroupController = (req) => req.app.get('container').resolve('GroupController')

router.get('/', checkifAuthenticated, async (req, res, next) => {
  await resolveGroupController(req).displayGroupData(req, res)
  })

router.post('/', checkifAuthenticated, (req, res, next) => {
  resolveGroupController(req).getQueryParametersForGroupData(req, res)
})