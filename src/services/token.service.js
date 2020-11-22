import jwt from 'jsonwebtoken'
import moment from 'moment'
import httpStatus from 'http-status'
import config from '../config/config'
import { Token } from '../models'
import { tokenTypes } from '../config/tokens'
import ApiError from '../utils/ApiError'
import userService from './user.service'

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return jwt.sign(payload, secret)
}

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  })
  return tokenDoc
}

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes')
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS)

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days')
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH)
  await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH)

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  }
}

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret)
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false })
  if (!tokenDoc) {
    throw new Error('Token not found')
  }
  return tokenDoc
}

const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email')
  }
  const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes')
  const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD)
  await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD)
  return resetPasswordToken
}

const generateUpdateEmailToken = async (user) => {
  const expires = moment().add(config.jwt.updateEmailExpirationMinutes, 'minutes')
  const updateEmailToken = generateToken(user.id, expires, tokenTypes.UPDATE_EMAIL)
  await saveToken(updateEmailToken, user.id, expires, tokenTypes.UPDATE_EMAIL)
  return updateEmailToken
}

export default {
  generateToken,
  saveToken,
  generateAuthTokens,
  verifyToken,
  generateResetPasswordToken,
  generateUpdateEmailToken,
}
