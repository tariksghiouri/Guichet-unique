var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


router.get('/', function (req, res, next) {

    connection.query('select current_timestamp;', function (err, rows) {

        if (err) {
            return res.json({ "message": err, "success": false });

        }
        else {

            res.send({ data: rows });
        }

    });

});


module.exports = router;