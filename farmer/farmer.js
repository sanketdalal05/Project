const express = require('express');
const farmer = express();
require('./model/farmdb');     // require farmdb file database connevtivity
const router = require('./farmroute/froutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 3000;


const options = {
  definition: {
      openapi: '3.0.3',
      info: {
          title: 'Dealer API',
      },
      servers: [
          {
              url: `http://localhost:${port}`,
          },
      ],
  },
  apis: ['./farmroute/*.js'],
};

farmer.use(express.json());
farmer.use('/',router);

farmer.use('/farmerapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

farmer.listen(port, () => {
  console.log(`listening on. ${port}`);
})