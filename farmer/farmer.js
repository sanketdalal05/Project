const express = require('express');
const farmer = express();
const db = require('./model/farmdb');     // require farmdb file database connevtivity


const port = process.env.PORT || 3000;
farmer.get("/", (req,res)=>{
  res.send("hello farmer here")
  console.log("hello farmer here");
})

farmer.listen(port, () => {
  console.log(`listening on. ${port}`);
})