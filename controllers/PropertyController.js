const Property = require("../models/Properties");
const Outlet = require("../models/Outlets");
const User = require("../models/Users");

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

const getPropertyDetail = async (req, res) => {
  //get money from every user in user history
  const users = await User.find({});

  const userHistory = users.map((user) => {
    return user.history;
  });
  const userHistoryMoney = userHistory.map((history) => {
    return history.map((item) => {
      return item.Money;
    });
  });
  const userHistoryMoneySum = userHistoryMoney.map((item) => {
    return item.reduce((a, b) => a + b, 0);
  });
  let userHistoryMoneySumTotal = userHistoryMoneySum.reduce((a, b) => a + b, 0);
  userHistoryMoneySumTotal = parseFloat(userHistoryMoneySumTotal.toFixed(2));

  let transactionProfit = userHistoryMoneySumTotal * 0.03;
  transactionProfit = parseFloat(transactionProfit.toFixed(2));

  //get Power from every user in user history
  const userHistoryPower = userHistory.map((history) => {
    return history.map((item) => {
      return item.Power;
    });
  });
  const userHistoryPowerSum = userHistoryPower.map((item) => {
    return item.reduce((a, b) => a + b, 0);
  });
  const userHistoryPowerSumTotal = userHistoryPowerSum.reduce(
    (a, b) => a + b,
    0
  );

  res.send({
    total: userHistoryMoneySumTotal,
    profit: transactionProfit,
    power: userHistoryPowerSumTotal,
  });
};

const getUsage = async (req, res) => {
  const users = await User.find({});

  const userHis = users.filter((user) => {
    return user.history.length > 0;
  });

  const userHistory = userHis.map((user) => {
    return user.history;
  });

  const userHistoryData = userHistory.map((history) => {
    return history.map((item) => {
      //get month from date
      const month = item.endDate.split("/")[0];
      return {
        money: item.Money,
        power: item.Power,
        endDate: item.endDate,
        day: parseInt(month),
      };
    });
  });

  //remove array in obejct
  const userHistoryDataFlat = userHistoryData.flat();

  //if day is the same merge the data
  const userHistoryDataFlatMerge = userHistoryDataFlat.reduce((acc, cur) => {
    const found = acc.find((item) => item.day === cur.day);
    if (found) {
      //fixed 2 decimal
      found.money = parseFloat((found.money + cur.money).toFixed(2));
      found.power = parseFloat((found.power + cur.power).toFixed(2));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);

  //sort by day
  const userHistoryDataFlatMergeSort = userHistoryDataFlatMerge.sort(
    (a, b) => a.day - b.day
  );




  

  res.send(userHistoryDataFlatMergeSort);
};

module.exports = {
  addProperty,
  getProperties,
  getProperty,
  getPropertyDetail,
  getUsage,
};
