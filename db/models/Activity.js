// Transaction ID
// Date and Time
// UID

const mongoose = require('mongoose');

//Activity schema
const ActivitySchema = new mongoose.Schema({
  amount: {
    type: Number

  },
  fromuid: {
    type: Number

  },
  fromname: {
    type: String

  },
  toname: {
    type: String

  },
  touid: {
    type: Number

  },
},
  { timestamps: true, versionKey: false }

);
const Activity = mongoose.model('Activity', ActivitySchema, 'Activity');
module.exports = Activity;
