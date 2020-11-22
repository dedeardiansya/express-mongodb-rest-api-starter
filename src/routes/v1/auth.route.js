import express from 'express'
import validate from '../../middlewares/validate'
import auth from '../../middlewares/auth'
import authController from '../../controllers/auth.controller'
import authValidation from '../../validations/auth.validation'

const router = express.Router()

router.post('/register', validate(authValidation.register), authController.register)
router.post('/login', validate(authValidation.login), authController.login)
router.delete('/logout', validate(authValidation.logout), authController.logout)
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens)
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword)
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword)

router.get('/', auth(), authController.profile)
router.put('/', auth(), validate(authValidation.updateProfile), authController.updateProfile)

export default router
