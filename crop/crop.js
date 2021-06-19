const express = require('express');
const crop = express();
require('./model/cropdb');     // require farmdb file database connevtivity


const router = require("./croproute/croutes");

const port = process.env.PORT || 8080;

crop.use(express.json());

crop.use(router);


crop.listen(port, function() {
    console.log('listening on 8080');
  })