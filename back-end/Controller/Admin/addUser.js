/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const USerSchema = require("../../Model/User/USerSchema");

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
module.exports.AddUser= async (req, res) => {
  const {filename}=req.file;
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
        imgPath:filename
      })
      user.save();
      res.status(201).json({ user: user._id, created: true });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    const errors = handleErrors(error);
    res.status(409).json({ errors, created: false });
  }
};