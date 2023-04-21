import express from 'express'
import createError from 'http-errors'
import { router as authRouter } from './auth/authRouter.js'
import { router as profileRouter } from './profile/profileRouter.js'
import { router as activityRouter } from './activities/activityRouter.js'
import { router as groupRouter } from './groups/groupRouter.js'

export const router = express.Router()

router.use('/login', authRouter)

router.use('/profile', profileRouter)

router.use('/activities', activityRouter)

router.use('/groups', groupRouter)

router.get('/', (req, res, next) => {
  res.render('home', {loggedIn : req.session.loggedIn})
})

router.get('/auth-succesful', (req, res, next) => {
  res.render('auth-succesful')
})

router.get('/log-out', (req, res) => {
  req.session.destroy()
  res.render('log-out')
})

router.use('*', (req, res, next) => next(createError(404)))

