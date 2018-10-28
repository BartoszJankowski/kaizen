
//const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

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

const User  = mongoose.model('User', userSchema);

exports.User = User;