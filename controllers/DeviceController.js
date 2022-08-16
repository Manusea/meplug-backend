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

const sendCode = (req, res) => {
  axios
    .put(
      "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01-Verification.json",
      req.body
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const getAuth = async (req, res) => {
  let status = "";
  await axios
    .get(
      "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01.json"
    )
    .then(async function (response) {
      status = response.data.StatusPlug;
      await axios
        .get(
          "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01-Verification.json"
        )
        .then(function (response) {
          if (status === "Ready") {
            res.send(response.data.VerificationqrId);
          } else {
            res.send(false);
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    })
    .catch(function (error) {
      console.error(error);
    });
};

const sendHour = (req, res) => {
  axios
    .put(
      "https://esp32-firebase-demo-398f6-default-rtdb.firebaseio.com/ME01-Hour.json",
      req.body
    )
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

module.exports = { getData, sendCode, getAuth, sendHour };
