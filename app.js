const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const dotenv = require('dotenv')
const admin = require('./firebase')

dotenv.config()
admin.init()

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

module.exports = app
