import httpStatus from 'http-status'
import catchAsync from '../utils/catchAsync'
import { userService, tokenService } from '../services'

export const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  res.status(httpStatus.CREATED).send({ user, tokens })
})

export default {
  register,
}
