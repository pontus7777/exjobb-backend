import swaggerJSDoc, { Options } from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Backend API',
      version: '1.0.0',
      description: 'API documentation for my backend',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Base URL for your API
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Adjust path for TypeScript source files
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
