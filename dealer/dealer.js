const express = require('express');
const dealer = express();
require('./model/dealdb');     // database connevtivity
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const droutes = require("./dealerroutes/droute");
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 4000;


dealer.use(express.json())
dealer.use(cookieParser());

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'dealer API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./dealerroutes/droute.js'],
};



dealer.use('/dealer',droutes);

dealer.use('/dealerapi', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));



module.exports = dealer.listen(port, function() {
    console.log('listening on' + port);
  })