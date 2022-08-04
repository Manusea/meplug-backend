const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

const AuthRoutes = require("./routes/Authentication");
const UserRoutes = require("./routes/UserRoutes");
const CarRoutes = require("./routes/CarRoutes");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB....");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auths", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/cars", CarRoutes);

app.get("/", (req, res) => {
  res.send("Meplug Backend Running");
});

app.listen(port, console.log("Listening on port: 127.0.0.1:", port));
