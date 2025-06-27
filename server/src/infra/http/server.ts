import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from "fastify";
import fastifyCors from '@fastify/cors'
import { hasZodFastifySchemaValidationErrors, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createShortenedLinkRoute } from "./routes/create-shortened-link";
import { deleteShortenedLinkRoute } from './routes/delete-shortened-link';
import { getOriginalLinkRoute } from './routes/get-original-link';
import { getShortenedLinksRoute } from './routes/get-shortened-links';
import { redirectRoute } from './routes/redirect-route';
import { exportShortenedLinksRoute } from './routes/export-shortened-links';

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.validation })
  }

  return reply.status(500).send({ message: 'Internal server error' })
})

server.register(fastifyCors, { 
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(createShortenedLinkRoute)
server.register(deleteShortenedLinkRoute)
server.register(getOriginalLinkRoute)
server.register(getShortenedLinksRoute)
server.register(redirectRoute)
server.register(exportShortenedLinksRoute)

server.listen({port: 3333, host: '0.0.0.0',}).then(() => {
  console.log('HTTP server running !')
})