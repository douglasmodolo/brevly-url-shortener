import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from "fastify";
import fastifyCors from '@fastify/cors'
import { hasZodFastifySchemaValidationErrors, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createShortenedLinkRoute } from "./routes/create-shortened-link";

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.validation })
  }

  // Envia o erro p/ alguma ferramenta de observabilidade (Sentry/DataDog/Grafana/OTel)
  console.error(error)

  return reply.status(500).send({ message: 'Internal server error' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Server',
      version: '1.0.0',
    },
  },
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(createShortenedLinkRoute)

server.listen({port: 3333, host: '0.0.0.0',}).then(() => {
  console.log('HTTP server running !')
})