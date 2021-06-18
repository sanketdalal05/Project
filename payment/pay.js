const express = require('express');
const payment = express();
require('./model/paydb');     // require database connevtivity

// get request
payment.get('/', (req, res) => {
    res.send('for payment gateway');
  })


payment.listen(7000, function() {
    console.log('listening on 7000');
  })