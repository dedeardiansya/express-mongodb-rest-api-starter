import nodemailer from 'nodemailer'
import config from '../config/config'
import logger from '../config/logger'

const transport = nodemailer.createTransport(config.email.smtp)

if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() =>
      logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env')
    )
}

const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text }
  await transport.sendMail(msg)
}

const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password'
  const resetPasswordUrl = `${config.frondEndBaseUrl}/reset-password?token=${token}`
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`
  await sendEmail(to, subject, text)
}

const sendUpdateEmailEmail = async (to, token) => {
  const subject = 'Update email'
  const updateEmailUrl = `${config.frondEndBaseUrl}/update-email?token=${token}`
  const text = `Dear user,
  To update your email, click on this link: ${updateEmailUrl}
  If you did not request any email changes, then ignore this email.`
  await sendEmail(to, subject, text)
}

export default {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendUpdateEmailEmail,
}
