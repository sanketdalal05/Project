const jwt = require('jsonwebtoken');

const authdeal = async(req,res,next)=>{
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'asdfghjklpoiuytrewqzxcvbnmasdfgh')
    req.token = token;
    next();
  } catch (error) {
    res.status(404).send('Access is only valid for dealer');
    console.log(error);
  }
}
module.exports = authdeal
