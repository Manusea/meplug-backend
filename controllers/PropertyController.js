const Property = require("../models/Properties");
const Outlet = require("../models/Outlets");

const addProperty = (req, res) => {
  const property = new Property({
    name: req.body.name,
    address: req.body.address,
    devices: req.body.devices,
    updatedAt: new Date(),
  });
  property
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
const getProperties = (req, res) => {
  Property.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
const getProperty = (req, res) => {
  Property.findById(req.body.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = { addProperty, getProperties, getProperty };
