const express = require('express');
const dealer = express();
require('./model/dealdb');     // database connevtivity

// get request
dealer.get('/', (req, res) => {
    res.send('Hello dealer here');
  })


dealer.listen(4000, function() {
    console.log('listening on 4000');
  })