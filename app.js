const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');

const app = express()
const port = 4000

const AuthRoutes = require('./routes/Authentication')

dotenv.config();

mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser: true,
})

const db = mongoose.connection;
db.once('open',()=>{
    console.log('Connected to MongoDB....');
})

app.post('/welcome', (req, res) =>{
    res.status(200).send("Welcome")
})

app.use('/auths', AuthRoutes);



app.use(bodyParser.json());


app.listen(port,console.log("Listening on port: 127.0.0.1:",port))
