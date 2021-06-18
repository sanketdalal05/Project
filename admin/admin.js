const express = require('express');
const admin = express();
require('./model/addb');     // database connevtivity

// get request
admin.get('/', (req, res) => {
    res.send('Hello Admin here');
    console.log("admin here");
  })


admin.listen(5000, function() {
    console.log('listening on 5000');
  })