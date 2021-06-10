
const mongoose = require('mongoose');

//User schema
const UserSchema = new mongoose.Schema({
    // field_name:uid 
    // Each user will have a unique id which cannot be updated
    uid: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 12,
        immutable: true
    },
    // field_name:email_id
    // email id
    em: {
        type: String,
        maxlength: 65,
        unique: true,
        sparse: true,
    },
    // field_name:Password
    //password for user
    accno: {
        type: String,

    },
    balance: {
        type: Number
    },
    name: {
        type: String,
        required: true
    }
},
    { timestamps: true, versionKey: false }

);

const User = mongoose.model('User', UserSchema, 'User');
module.exports = User;
