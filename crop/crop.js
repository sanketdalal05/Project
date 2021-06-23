const express = require('express');
require('./model/cropdb');     // require farmdb file database connevtivity
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const croproute = require("./croproute/croutes");

const crop = express();
const port = process.env.PORT || 8080;

crop.use(express.json());

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'crop API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./croproute/croutes.js'],
};


crop.use('/crop',croproute);

crop.use('/cropapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

module.exports= crop.listen(port, function() {
    console.log('listening on' + port);
})