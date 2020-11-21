import httpStatus from 'http-status'
import { User } from '../models'
import ApiError from '../utils/ApiError'

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken')
  }
  const user = await User.create(userBody)
  return user
}

const getUserByEmail = async (email) => {
  return User.findOne({ email })
}

const getUserById = async (id) => {
  return User.findById(id)
}

export default {
  createUser,
  getUserByEmail,
  getUserById,
}
