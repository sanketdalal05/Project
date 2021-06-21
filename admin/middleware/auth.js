// const jwt = require('jsonwebtoken');
// const User = require('../model/admmodel');

// const requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;

//   // check json web token exists & is verified
//   if (token) {
//     jwt.verify(token, 'adminsecret', (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         // res.redirect('/login');
//         res.send("you have to login again");
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     res.redirect('/login');
//     res.send("login again");
//   }
// };

// // check current user
// const checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         let user = await User.findById(decodedToken.id);
//         res.locals.user = user;
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };


// module.exports = { requireAuth, checkUser };