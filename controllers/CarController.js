const axios = require("axios");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2c494c6a62msh6702f97bca379f4p17f6fajsnf7ae539eccce",
    "X-RapidAPI-Host": "cars-specs-automotive-catalog.p.rapidapi.com",
  },
};

const getCarData = async (req, res) => {
  axios
    .get(
      "https://cars-specs-automotive-catalog.p.rapidapi.com/api/cars/full-specs/" +
        req.body.brand +
        "/" +
        req.body.model,
      options
    )
    .then(function (response) {
      data = response.data.data.generations;
      var name = getCarName(data);
      res.send(name);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const getCarName = (data) => {
  // loop through the data and find the car name and modification engine
  var cars = [];
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].engines.length; j++) {
      if (data[i].engines[j].electric_cars_and_hybrids_specs !== undefined) {
        console.log(
          data[i].engines[j].brand +
            data[i].engines[j].model +
            data[i].engines[j].generation +
            data[i].engines[j].modification_engine +
            data[i].engines[j].electric_cars_and_hybrids_specs
        );
        cars.push(data[i].engines[j]);
      }
    }
  }
  return cars;
};

module.exports = { getCarData, getCarName };
