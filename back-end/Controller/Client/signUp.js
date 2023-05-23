/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const jwt = require("jsonwebtoken");
const USerSchema = require("../../Model/User/userSchema");

const maxAge = 3 * 24 * 60 * 60;
const cretaeToken = (id) =>
  jwt.sign({ id }, "mysecretcode", {
    expiresIn: maxAge,
  });

const handleErrors = (err) => {
  const errors = { name: "", email: "", password: "" };
  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
module.exports.signUp = async (req, res) => {
  try {
    const { name, email, password,image } = req.body;
    const ifUser = await USerSchema.findOne({ email });
    if (ifUser) {
      const errors = { name: "", email: "", password: "" };
      errors.email = "Email is already registered";
      res.json({ errors, created: false });
    } else {
      const user = new USerSchema({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
      })
      user.save();
      const token = cretaeToken(user._id);
      res.cookie("jwt", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 100,
      });
      res.status(201).json({ user, created: true });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    const errors = handleErrors(error);
    res.status(409).json({ errors, created: false });
  }
};
