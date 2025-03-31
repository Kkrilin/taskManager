import swaggerJsdoc from 'swagger-jsdoc';
import config from './config/config.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API documentation for the Task Manager application',
    },
    servers: [
      {
        url: `http://localhost:${config.serverPort}`, // Replace with your server URL
        description: 'Development server',
      },
      {
        url: config.url, // Replace with your server URL
        description: 'production Server',
      },
    ],
  },
  apis: ['./swaggerDocs.js'], // Path to the API route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
