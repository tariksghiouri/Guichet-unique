var express = require('express');
var router = express.Router();
var connection  = require('../connections/connection');
// var connection  = require('../connections/database');
 
router.get('/', function (req, res) {

    connection.query('SELECT id, Intitule FROM filieredestination ',  function (err, rows) {

        if (err) {
            return res.json({"message":err, "success": false});

        } else {

            res.send( rows);
        }

    });


});
module.exports = router;