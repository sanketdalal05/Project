const express = require('express');
const farmer = express();
require('./model/farmdb');     // require farmdb file database connevtivity

const dbs = require('./farmroute/froutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const login = require('./farmroute/loginroute')

const port = process.env.PORT || 3000;

farmer.use(express.json());


farmer.use("farmer/login", login)

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./farmroute/*.js'],
};


farmer.use('/farmer', dbs);

farmer.use('/farmerapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// farmer.listen(port, () => {
//   console.log(`listening on. ${port}`);
// })
module.exports = farmer.listen(port);
console.log(`listening on. ${port}`);