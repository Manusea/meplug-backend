const mongoose = require('mongoose')
const express = require('express')
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

app.use(express.json())


app.use('/auths', AuthRoutes);


app.get('/', (req, res) => {
    res.json({message: 'Hello World!'})
})

app.listen(port,console.log("Listening on port: 127.0.0.1:",port))
