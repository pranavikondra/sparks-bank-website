var express = require('express');
var router = express.Router();
const User = require('./../db/models/User')

try {

    router.get('/', async (req, res, next) => {

        let resp = await User.find();
        res.render('transfermoney', {
            resp
        })
        // };
    });
} catch (error) {
    throw error
}


module.exports = router;
