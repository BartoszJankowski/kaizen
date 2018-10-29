
//const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Joi  = require('joi');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        minlength : 6,
        maxlength : 255
    },
    short_name : {
        type :  String, 
        minlength : 2,
        maxlength : 4,
        required : true,
        unique : true
    },
    email : {
        type : String,
        minlength : 6,
        maxlength : 255,
        required : true,
        unique : true
    },
    mac_address : {
        type: String,
        minlength : 17,
        maxlength:17,
        required : true,
        unique : true
    }
});

function validateNewUser(user){
    const schema = {
        name : Joi.string().optional().allow('').min(6).max(255),
        short_name : Joi.string().min(2).max(4).required(),
        email : Joi.string().min(6).max(255).email().required(),
        mac_address : Joi.string().length(17).required()
    }

    return Joi.validate(user, schema);
}

const User  = mongoose.model('User', userSchema);

exports.User = User;
exports.validate = validateNewUser;