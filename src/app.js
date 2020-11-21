import express from 'express'
import helmet from 'helmet'
import xss from 'xss-clean'
import compression from 'compression'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import httpStatus from 'http-status'
import passport from 'passport'
import { jwtStrategy } from './config/passport'
import morgan from './config/morgan'
import ApiError from './utils/ApiError'
import { errorConverter, errorHandler } from './middlewares/error'
import apiV1Route from './routes/v1'

const app = express()

app.use(morgan.successHandler)
app.use(morgan.errorHandler)
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(xss())
app.use(mongoSanitize())
app.use(compression())
app.use(cors())
app.options('*', cors())
app.use(cookieParser())

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use('/api/v1', apiV1Route)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})
app.use(errorConverter)
app.use(errorHandler)

export default app
