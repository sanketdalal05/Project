const express = require('express');
const farmer = express();
require('./model/farmdb');     // require farmdb file database connevtivity
const router = require('./farmroute/froutes');

const port = process.env.PORT || 3000;

farmer.use(express.json());
farmer.use(router);

farmer.listen(port, () => {
  console.log(`listening on. ${port}`);
})