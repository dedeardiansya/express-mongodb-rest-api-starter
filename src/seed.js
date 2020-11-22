import mongoose from 'mongoose'
import { User } from './models'
import config from './config/config'

const seed = async () => {
  await User.create(config.admin)
  // eslint-disable-next-line no-use-before-define
  complete('Seed complete.')
}

const complete = (mess) => {
  // eslint-disable-next-line no-console
  console.info(mess)
  process.exit(0)
}

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  seed().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    complete('Seed failed.')
  })
})
