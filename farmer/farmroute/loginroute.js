const express = require('express');
const controller = require('../controller/farmcontroller');
let loginroute = express.Router();

loginroute
    .route("/")
    .post(controller.farmlogin)



    module.exports = loginroute;