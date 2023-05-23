const USerSchema = require("../../Model/User/userSchema");

module.exports.getUser = async (req, res) => {
  try {
    const users = await USerSchema.find();
    if (users) res.status(201).json(users);
    else res.status(404).json("No Users Found");
  } catch (error) {
    res.status(404).json("No Users Found");
  }
};