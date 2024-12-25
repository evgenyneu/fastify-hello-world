'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.header('x-filler', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    return 'Hello, World!'
  })
}
