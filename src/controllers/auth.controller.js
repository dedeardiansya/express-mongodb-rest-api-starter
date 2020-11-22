import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { userService, tokenService, authService, emailService } from '../services'

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({ user, tokens })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)
  res.send({ user, tokens })
})

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken)
  res.send({ ...tokens })
})

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email)
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password)
  res.status(httpStatus.NO_CONTENT).send()
})

const profile = (req, res) => {
  res.send(req.user)
}

const updateProfile = catchAsync(async (req, res) => {
  req.user = await userService.updateUserById(req.user.id, req.body)
  res.send(req.user)
})

const changeEmail = catchAsync(async (req, res) => {
  const UpdateEmailToken = await tokenService.generateUpdateEmailToken(req.user)
  await emailService.sendUpdateEmailEmail(req.user.email, UpdateEmailToken)
  res.status(httpStatus.NO_CONTENT).send()
})

const updateEmail = catchAsync(async (req, res) => {
  await authService.updateEmail(req.query.token, req.body.email)
  res.status(httpStatus.NO_CONTENT).send()
})

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  profile,
  updateProfile,
  changeEmail,
  updateEmail,
}
