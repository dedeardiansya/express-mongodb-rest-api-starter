import httpStatus from 'http-status'
import { User } from '../models'
import ApiError from '../utils/ApiError'

export const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  const user = await User.create(userBody)
  return user
}

export default {
  createUser,
}
