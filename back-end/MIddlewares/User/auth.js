const jwt = require("jsonwebtoken");
const User = require("../../Model/User/userSchema");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "mysecretcode", async (err, decodeToken) => {
      if (err) {
        res.status(403).json({ status: false });
        next();
      } else {
        const user = await User.findOne({_id:decodeToken.id});
        if (user) res.status(201).json({ status: true, user });
        else res.status(403).json({status:false});
        next();
      }
    });
  }else{
	  res.status(403).json({ status: false });
	  next();
  }
};
