import express from 'express'
import helmet from 'helmet'
import xss from 'xss-clean'
import compression from 'compression'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from 'cookie-parser'
import morgan from './config/morgan'

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

export default app
