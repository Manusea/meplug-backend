const User = require("../models/Users");

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

module.exports = { getUsers };