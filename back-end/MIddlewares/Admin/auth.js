const jwt = require("jsonwebtoken");

module.exports.checkAdmin = (req, res, next) => {
    console.log('call vann');
//   const token = req.cookies.admin;
//   if (token) {
//     jwt.verify(token, "mysecetcode", async (err, decodeToken) => {
//       if (err) {
//         res.status(403).json({ status: false });
//         next();
//       } else {
//         console.log(decodeToken);
//         // if (user) res.status(201).json({ status: true, user: user.email });
//         // else res.status(403).json({status:false});
//         next();
//       }
//     });
//   }else{
// 	  res.status(403).json({ status: false });
// 	  next();
//   }
};
