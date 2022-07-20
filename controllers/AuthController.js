const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs/dist/bcrypt');

const register = async (req, res) => {
    res.status(200).send("Register Test")
}

module.exports = {register}