const User = require("../models/Users");
const Cars = require("../models/Cars");
const axios = require("axios");

function lastDateFormat(dt) {
  const d = new Date(dt);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const h = d.getHours().toString();
  const m = d.getMinutes().toString();
  const s = d.getSeconds().toString();
  var localTime =
    date +
    "/" +
    month.toString().padStart(2, "0") +
    "/" +
    year.toString().padStart(2, "0") +
    "T" +
    h.padStart(2, "0") +
    ":" +
    m.padStart(2, "0") +
    ":" +
    s.padStart(2, "0");
  // return localTime + "T00:00:00";
  return localTime;
}

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
};

//Add data to charging object
const addCharging = async (req, res) => {
  const min = { min: req.body.duration };
  const status = { Charging: true };
  axios.put(
    "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01-Charging.json",
    status
  );
  axios.put(
    "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01-Minute.json",
    min
  );

  const user = await User.findById(req.body.id);
  if (!user) return res.status(400).send("User not found");

  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + req.body.duration * 60000);

  const startTimeFormat = lastDateFormat(startTime);
  const endTimeFormat = lastDateFormat(endTime);

  const startDate = startTimeFormat.split("T")[0];
  const startT =
    startTimeFormat.split("T")[1].split(":")[0] +
    ":" +
    startTimeFormat.split("T")[1].split(":")[1];

  const endDate = endTimeFormat.split("T")[0];
  const endT =
    endTimeFormat.split("T")[1].split(":")[0] +
    ":" +
    endTimeFormat.split("T")[1].split(":")[1];

  const charging = {
    duration: req.body.duration,
    mode: req.body.mode,
    selectedCar: req.body.selectedCar,
    startDate: startDate,
    endDate: endDate,
    startTime: startT,
    endTime: endT,
    location: req.body.location,
    deviceId: req.body.deviceId,
    startDateLocal: startTime,
    endDateLocal: endTime,
  };
  user.charging = charging;
  await user.save();
  res.send(user.charging);
};

//gets charging data
const getCharging = async (req, res) => {
  const user = await User.findById(req.body.id);
  if (!user) return res.status(400).send("User not found");

  const charging = user.charging;
  res.send(charging);
};

const endCharging = async (req, res) => {
  const status = { Charging: false };
  // axios
  //   .put(
  //     "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01-Charging.json",
  //     status
  //   )

  //remove charging data in user
  const user = await User.findById(req.body.id);
  if (!user) return res.status(400).send("User not found");

  const startDate = user.charging.startDateLocal;
  const nowDate = new Date();

  const diff = nowDate.getTime() - startDate.getTime();

  const diffSeconds = Math.floor(diff / 1000);

  //add startDate and nowDate to charging object
  const startDateFormat = lastDateFormat(startDate);
  const nowDateFormat = lastDateFormat(nowDate);

  user.charging.startDateLocal = startDateFormat.split("T")[0];
  user.charging.nowDateLocal = nowDateFormat.split("T")[0];

  user.charging.startTime = startDateFormat.split("T")[1].split(":")[0] + ":" + startDateFormat.split("T")[1].split(":")[1];
  user.charging.nowTime = nowDateFormat.split("T")[1].split(":")[0] + ":" + nowDateFormat.split("T")[1].split(":")[1];

  user.charging.duration = diffSeconds;

  //merge charging and req.body.device object
  const device = req.body.device;
  const newDevice = {
    DeviceID: device.DeviceID,
    Location: device.Location,
    Money: device.Money,
    Power: device.Power,
    Ampre: device.Ampre,
    Voltage: device.Voltage,
    Temperature: device.Temperature,
  };
  const charging = user.charging;
  const newCharging = { ...charging, ...newDevice };

  user.history.push(newCharging);
  user.charging = {};
  await user.save();
  res.send({ success: true, user: [user] });
};

//withdraw money from user
const withdraw = async (req, res) => {
  const user = await User.findById(req.body.id);
  if (!user) return res.status(400).send("User not found");

  if (user.balance < req.body.balance)
    return res.status(400).send("Insufficient balance");
  user.balance -= req.body.balance;
  await user.save();
  res.send({user: [user] });
};

module.exports = {
  getUsers,
  topup,
  withdraw,
  getUserCars,
  addCharging,
  getCharging,
  endCharging,
};
