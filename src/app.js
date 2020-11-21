import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

export default app
