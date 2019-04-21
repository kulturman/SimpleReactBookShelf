const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
    name: String,
    forename: String,
    username: String,
    password: String
});

schema.methods.generateToken = function () {
    return jwt.sign({_id: this._id} , 'NoSecretKey');
}

const User = mongoose.model('User' , schema);

module.exports = User;