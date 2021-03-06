import Joi from 'joi'
import custom from './custom.validation'

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(custom.password),
    name: Joi.string().required(),
  }),
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
}

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
}

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(custom.password),
  }),
}

const updateProfile = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
}

const changeEmail = {
  body: Joi.object().keys({}),
}

const updateEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
}

const updatePassword = {
  body: Joi.object().keys({
    password: Joi.string().required(),
    new_password: Joi.string().required().custom(custom.password),
  }),
}

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  updateProfile,
  changeEmail,
  updateEmail,
  updatePassword,
}
