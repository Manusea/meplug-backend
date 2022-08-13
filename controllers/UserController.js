const User = require("../models/Users");
const Cars = require("../models/Cars");

const getUsers = async (req, res) => {
  const users = await User.find({ _id: req.body.id }, { date: 0, __v: 0 });
  res.send({ success: true, user: users });
};

const topup = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.body.id },
    { $inc: { balance: req.body.balance } }
  );
  res.send({ success: true, user: user });
};

const getUserCars = async (req, res) => {
  const user = await User.findById(req.body.id);
  if (!user) return res.status(400).send("User not found");

  const cars = await Cars.find({ _id: { $in: user.cars } });
  res.send(cars);
}

//Add data to charging object
const addCharging = async (req, res) => {
  console.log(req.body);
  const user = await User.findById(req.body.id);
  if (!user) return res.status(400).send("User not found");

  // const charging = {
  //   duration: req.body.hours,
  //   mode: req.body.mode,
  //   selectedCar: req.body.selectedCar,
  //   startDate: req.body.startDate,
  //   endDate: req.body.endDate,
  //   startTime: req.body.startTime,
  //   endTime: req.body.endTime,
  // };
  // user.charging = charging;
  // await user.save();
  // res.send({ success: true, user: user });
}



module.exports = { getUsers, topup, getUserCars, addCharging };
