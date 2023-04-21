import { container } from './config/bootstrap.js'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { router } from './routes/router.js'
import 'dotenv/config'

try {

  const directoryFullName = dirname(fileURLToPath(import.meta.url))

  const app = express()

  app.set('container', container)

  const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'strict'
    }
  }

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sessionOptions.cookie.secure = true
  }

  app.use(session(sessionOptions))

  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
  app.use(helmet({
    contentSecurityPolicy: {
      crossOriginEmbedderPolicy: false,
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': ["'self'", 'https://gitlab.lnu.se', "https://secure.gravatar.com"],
      },
    },
  }))

  app.use(express.json())

  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))
  app.use(express.static(join(directoryFullName, '..', 'public')))
  app.use(express.urlencoded({ extended: false }))
  
  
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
  })

  app.use('/', router)
  
} catch (error) {
  console.log(error)
}

