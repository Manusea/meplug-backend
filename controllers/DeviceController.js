const axios = require("axios");

const getData = (req, res) => {
  axios
    .get(
      "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01.json"
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const sendHour = (req, res) => {
  axios
    .put(
      "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01.json",
      req.body
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
module.exports = { getData, sendHour };
