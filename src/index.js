import http from 'http'
import debug from 'debug'
import normalizePort from 'normalize-port'
import app from './app'

const server = http.createServer(app)

server.listen(normalizePort(process.env.PORT || '3000'))

server.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.error(`Server error`, error.message)
  process.exit(1)
})

server.on('listening', () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
})
