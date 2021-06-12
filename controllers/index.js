var express = require('express');
var router = express.Router();

try {
    router.get('/', function(req, res, next) {
        res.render('index', );
    });
} catch (e) {
    throw e;
}
module.exports = router;