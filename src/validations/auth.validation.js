import Joi from 'joi'
import custom from './custom.validation'

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(custom.password),
    name: Joi.string().required(),
  }),
}

export default {
  register,
}
