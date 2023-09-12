// import { Express, Request, Response } from "express";

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express') 
 

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: "API Documentation for Adventura Backend App",
        version: '1.0.0'
      },
      components:{
        securitySchemas: {
            bearerAuth: {
                type: 'http',
                schema: "bearer",
                bearerFormat: "jwt",
            }
        }
      },
      security: [
        {
            bearerAuth: []
        }
      ],
    },
    apis: ['./routes/*.js', './models/*.js']
  }
  
  const swaggerSpec = swaggerJsDoc(options)

  function swaggerDocs (app, port) {

    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('docs.json', (req, res) => {
        res.setHeader("Content-Type", "application/json")
        res.send(swaggerSpec)
    })

    console.log(`Docs available at http://localhost:${port}/api/v1/docs`);

  }

module.exports = swaggerDocs; 