// const farmAuth = (req, res, next) => {
//       const token = req.cookies.jwt;
    
//       if (token) {
//         jwt.verify(token, "passkey", async (err, decodedToken) => {
//           if (err) {
//             res.json({ message: "Unauthorized client" });
//           } else {
//             console.log(decodedToken.id);
//             next();
//           }
//         });
//       } else {
//         res.json({ message: "Please login" });
//       }
//     };

// model.exports = farmAuth;





// const jwt = require('jsonwebtoken');
// const express = require('express');
// // const auth = express();
// // const cookieParser = require('cookie-parser');
// const authad = async(req,res,next)=>{
//     try {
//       const token = req.cookies.jwt;
//       const verifyUser = jwt.verify(token, "mysecretkey");
//     //   console.log(verifyUser);
//       req.token = token;
//       next();
//     } catch (error) {
//       res.status(404).send('do login');
//       console.log(error);
//     }
//   }
//   module.exports = authad;