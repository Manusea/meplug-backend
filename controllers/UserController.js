const User = require("../models/Users");

const getUsers = async (req, res) => {
  const users = await User.find({_id: req.body.id}, {date: 0,__v: 0});
  res.send({success: true , user: users});
};

module.exports = { getUsers };