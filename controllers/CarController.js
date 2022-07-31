
//For Fetch Car Data to Json
// const axios = require("axios");

// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "2c494c6a62msh6702f97bca379f4p17f6fajsnf7ae539eccce",
//     "X-RapidAPI-Host": "cars-specs-automotive-catalog.p.rapidapi.com",
//   },
// };

// const getCarData = async (req, res) => {
//   axios
//     .get(
//       "https://cars-specs-automotive-catalog.p.rapidapi.com/api/cars/full-specs/" +
//         req.body.brand,
//       options
//     )
//     .then(function (response) {
//       data = response.data.data.models;
//       var name = getCarName(data);
//       res.send(name);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// };

// const getCarName = (data) => {
//   // loop through the data and find the car name and modification engine
//   var cars = [];
//   for (var i = 0; i < data.length; i++) {
//     for (var j = 0; j < data[i].generations.length; j++) {
//       for (var k = 0; k < data[i].generations[j].engines.length; k++) {
//         if (data[i].generations[j].engines[k].electric_cars_and_hybrids_specs !== undefined) {
//           cars.push({
//             brand: data[i].generations[j].engines[k].brand,
//             name:
//             data[i].generations[j].engines[k].brand +
//               " " +
//               data[i].generations[j].engines[k].generation +
//               " " +
//               data[i].generations[j].engines[k].modification_engine,
//             specs: data[i].generations[j].engines[k].electric_cars_and_hybrids_specs,
//           });
//         }
//       }
//     }
//   }
//   return cars;
// };

const Cars = require("../models/Cars");

const getCarName = async (req, res) => {
  let search = await Cars.find({name: {$regex: req.body.data.trim(), $options: "i"}});
  search = search.slice(0, 10);
  res.send(search);
};


module.exports = { getCarName };
