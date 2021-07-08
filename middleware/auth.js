const jwt = require('jsonwebtoken');
const express = require('express');
const auth = express();
const cookieParser = require('cookie-parser');

auth.use(cookieParser());

const authad = async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token,'asdfghjklpoiuytrewqzxcvbnmasdfgh');
    console.log(verifyUser);
    next();
  } catch (error) {
    res.status(404).send('do login');
    console.log(error);
  }
}
module.exports = authad;        //to export module