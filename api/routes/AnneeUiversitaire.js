var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


router.get('/', function (req, res, next) {

    connection.query('SELECT * FROM AnneeUiversitaire', function (err, rows) {

        if (err) {
            throw err;

        } else {

            res.send(rows);
        }

    });

});
router.post('/edit', function (req, res, next) {
    var DebutCandidatures = req.body.DebutCandidatures;
    var FinCandidatures = req.body.FinCandidatures
    var DebutPreselection = req.body.DebutPreselection
    var FinPreselection = req.body.FinPreselection
    var Test = req.body.Test
    var InscriptionsListP = req.body.InscriptionsListP
    var InscriptionsListAtt = req.body.InscriptionsListAtt
    var number = 1
    //     const sql = `
    //       UPDATE
    //        anneeuiversitaire
    //         SET
    //            DebutCandidatures='${DebutCandidatures}',
    //            FinCandidatures='${FinCandidatures}',
    //            DebutPreselection='${DebutPreselection}',
    //            FinPreselection='${FinPreselection}',
    //            Test='${Test}',
    //            InscriptionsListP='${InscriptionsListP}',
    //            InscriptionsListAtt='${InscriptionsListAtt}',
    //       WHERE
    //       label=${number} `
    //     connection.query(sql.replace(/\n/g, ''), function (err, rows) {

    //         if (err) {
    //             return res.json({ "message": err, "success": false });

    //         }
    //         return res.json({ "message": "done", "success": true });

    //     });

    // });
    const sql = `UPDATE anneeuiversitaire SET  DebutCandidatures="${DebutCandidatures}",FinCandidatures="${FinCandidatures}",DebutPreselection="${DebutPreselection}",FinPreselection="${FinPreselection}",Test="${Test}",InscriptionsListP="${InscriptionsListP}",InscriptionsListAtt="${InscriptionsListAtt}"  WHERE label = ${number}`;



    connection.query(sql.replace(/\n/g, ''), function (err, response) {
        if (err) {
            return res.json({ "message": err, "success": false });

        }
        return res.json({ "message": "bous ", "success": true });
    });



});


module.exports = router;