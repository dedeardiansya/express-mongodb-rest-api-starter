import httpStatus from 'http-status'
import ApiError from '../utils/ApiError'

export default async function password(req, res, next) {
  if (!req.user) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'))
  }
  if (req.body.password && (await req.user.isPasswordMatch(req.body.password))) {
    return next()
  }
  return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid password!'))
}
