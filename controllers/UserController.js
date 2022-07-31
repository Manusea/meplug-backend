const User = require("../models/Users");

const getUsers = async (req, res) => {
  const users = await User.find({_id: req.body.id}, {date: 0,__v: 0});
  res.send({success: true , user: users});
};

const topup = async (req, res) => {
  const user = await User.findOneAndUpdate({_id: req.body.id}, {$inc: {balance: req.body.balance}});
  res.send({success: true , user: user});
};

module.exports = { getUsers, topup };