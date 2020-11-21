import httpStatus from 'http-status'
import userService from './user.service'
import ApiError from '../utils/ApiError'
import { Token } from '../models/index'
import { tokenTypes } from '../config/tokens'

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email)
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
  }
  return user
}

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false })
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found')
  }
  await refreshTokenDoc.remove()
}

export default {
  loginUserWithEmailAndPassword,
  logout,
}
