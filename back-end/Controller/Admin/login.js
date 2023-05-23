const jwt = require("jsonwebtoken");

module.exports.login = (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "admin@gmail.com" && password === "123") {
      const maxAge = 3 * 24 * 60 * 60;
      const id='63bf93190a919e7f1996ab5f'
      const cretaeToken = (data) => jwt.sign({ data }, 'mysecretcode', {expiresIn: maxAge,});
      const token=cretaeToken(id);
      
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 100,
      });
      res.status(201).json({ created: true });
    } else {
      const errors = "Bad Credentials";
      res.json({ errors, created: false });
    }
  } catch (error) {
    console.log(error);
  }
};
