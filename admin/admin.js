const express = require('express');
const admin = express();
require('./model/addb');     // database connevtivity
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require("./router/adrouter");

admin.use(express.json());
// get request

const options = {
  definition: {
      info: {
          title: 'API',
          description: "GET"
      },
      servers: [
        {
            url: `http://localhost:5000`,
        },
    ],
  },
  apis: ['*.js'],
}


const swaggerDocs = swaggerJsDoc(options);


/** 
 *  @swagger
 *  /:
 *  get:
 *      summary: "welcome admin here"
 *      responses: 
 *          '200':
 *              description: A successful response
 */
// admin.get('/', (req, res) => {
//     res.send('Hello Admin here');
//     console.log("admin here");
//   })
admin.use("/admin",router);
admin.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));


admin.listen(5000, function() {
    console.log('listening on 5000');
  })
