const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

        uid: {
            type: Number,
            required: true,
            unique: true,
            maxlength: 12,
            immutable: true
        },

        em: {
            type: String,
            maxlength: 65,
            unique: true,
            sparse: true,
        },

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
    }, { timestamps: true, versionKey: false }

);

const User = mongoose.model('User', UserSchema, 'User');
module.exports = User;