var express = require('express');
var router = express.Router();
const Activity = require('./../db/models/Activity');
try {
    module.exports = async (req, res) => {
        let response = await Activity.find().sort({ $natural: -1 });
        let resp = response
        res.render('transactionhistory', {
            resp
        })

    };
} catch (error) {
    throw error
}

