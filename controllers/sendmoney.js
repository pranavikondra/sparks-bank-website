var express = require('express');
var router = express.Router();
const Activity = require("../db/models/Activity");
const User = require('./../db/models/User')
const formidable = require('formidable');

module.exports = async(req, res) => {
    try {
        var names;


        var form = new formidable.IncomingForm();
        form.parse(req, async function(err, fields, files) {
            if (err) {
                console.log("err:", err);
            }
            if (Object.keys(fields).length != 0) {
                var fromuid = fields.fromuid;
                var touid = fields.touid;
                var getfromuseramount = await User.findOne({ uid: fromuid })
                var gettouseramount = await User.findOne({ uid: touid });

                if (getfromuseramount.balance >= fields.amount) {
                    if (touid == fromuid) {

                        let notsame = 'Sender and Receiver cannot be same'
                        res.render('transactionhistory', {
                            notsame
                        })
                    } else {
                        var transfermoneyto = await Activity.create({
                                fromuid: fields.fromuid,
                                touid: fields.touid,
                                amount: fields.amount,
                                fromname: getfromuseramount.name,
                                toname: gettouseramount.name
                            })
                            // names = transfermoneyto
                        names = transfermoneyto;

                        getfromuseramount.balance = getfromuseramount.balance - fields.amount;
                        let updated = await User.findOneAndUpdate({ uid: fromuid }, {...getfromuseramount }, { new: true });
                        gettouseramount.balance = parseInt(gettouseramount.balance) + parseInt(fields.amount);
                        let updated2 = await User.findOneAndUpdate({ uid: touid }, {...gettouseramount }, { new: true });

                        let resp = await User.find();

                        res.render('transactionhistory', {
                            names,
                            resp
                        });
                    }
                } else {
                    let unsuccess = true
                    res.render('transactionhistory', {
                        unsuccess
                    });
                }

            }
        });

    } catch (error) {
        throw error
    }
}