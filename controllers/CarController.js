const axios = require("axios");
const Cars = require("../models/Cars");
const User = require("../models/Users");
// const multer = require("multer");
// const fs = require("fs");

//Storage
// const Storage = multer.diskStorage({
//   destination: "uploads",
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: Storage,
//   limits: { fileSize: 1000000 },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error("Please upload an image"));
//     }
//     cb(undefined, true);
//   },
// });

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2c494c6a62msh6702f97bca379f4p17f6fajsnf7ae539eccce",
    "X-RapidAPI-Host": "cars-specs-automotive-catalog.p.rapidapi.com",
  },
};

// const uploadImage = async (req, res) => {
//   upload.single("image")(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ error: err.message });
//     }
//     const findCar = await Cars.findById(req.body.carId);
//     findCar.image = {
//       data: fs.readFileSync(req.file.path),
//       contentType: "image/png",
//     };
//     await findCar
//       .save()
//       .then(() => {
//         res.send("Image uploaded successfully");
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).send("Error uploading image");
//       });
//   });

//   console.log("Below upload");
// };

const getCarData = async (req, res) => {
  axios
    .get(
      "https://cars-specs-automotive-catalog.p.rapidapi.com/api/cars/full-specs/" +
        req.body.brand,
      options
    )
    .then(function (response) {
      data = response.data.data.models;
      var name = fetchCarDetails(data);
      res.send(name);
    })
    .catch(function (error) {
      console.error(error);
    });
};

const fetchCarDetails = (data) => {
  // loop through the data and find the car name and modification engine
  var cars = [];
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].generations.length; j++) {
      for (var k = 0; k < data[i].generations[j].engines.length; k++) {
        if (
          data[i].generations[j].engines[k].electric_cars_and_hybrids_specs !==
          undefined
        ) {
          console.log(data[i].generations[j].engines[k]);
          cars.push({
            brand: data[i].generations[j].engines[k].brand,
            generation: data[i].generations[j].engines[k].generation,
            modification_engine:
              data[i].generations[j].engines[k].modification_engine,
            fullname:
              data[i].generations[j].engines[k].brand +
              " " +
              data[i].generations[j].engines[k].generation +
              " " +
              data[i].generations[j].engines[k].modification_engine,
            specs:
              data[i].generations[j].engines[k].electric_cars_and_hybrids_specs,
          });
        }
      }
    }
  }
  return cars;
};

const getCarName = async (req, res) => {
  let search = await Cars.find({ fullname: { $regex: req.body.data.trim() } },
    { specs: 0 }
  );
  search = search.slice(0, 10);
  res.send(search);
};

const addCarToUser = async (req, res) => {
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("User not found");

  const car = await Cars.findById(req.body.carId);
  if (!car) return res.status(400).send("Car not found");

  user.cars.push(car);
  await user.save();
  res.send(user);
};

module.exports = { getCarName, getCarData, addCarToUser };
