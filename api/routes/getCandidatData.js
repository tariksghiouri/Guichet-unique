var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


// @ts-ignore
router.get('/', function (req, res, next) {

    connection.query('SELECT * FROM candidats', function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;


        } else {

            res.send({ data: rows });
        }

    });

});

router.get('/:id', function (req, res) {

    // if (!req.params.id) {
    //     res.json({ success: false, message: 'pas de filieres' });
    // }
    // else {
    // console.log(req.params.id);

    const id = Number(req.params.id);
    connection.query('SELECT * FROM candidats WHERE IdCompte=?', [id], function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;


        } else {

            res.send({ data: rows });
        }

    });


});
router.get('/unique/:id', function (req, res) {



    const id = Number(req.params.id);
    connection.query('SELECT * FROM candidats WHERE NumcondidatureReel=?', [id], function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;


        } else {

            res.send({ data: rows });
        }

    });


});

router.get('/bac/:id', function (req, res) {

    // if (!req.params.id) {
    //     res.json({ success: false, message: 'pas de filieres' });
    // }
    // else {
    // console.log(req.params.id);

    const id = Number(req.params.id);
    connection.query('SELECT * FROM bac WHERE id=?', [id], function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;


        } else {

            res.send({ data: rows });
        }

    });


});
router.get('/DiplomeObtenu/:id', function (req, res) {

    // if (!req.params.id) {
    //     res.json({ success: false, message: 'pas de filieres' });
    // }
    // else {
    // console.log(req.params.id);

    const id = Number(req.params.id);
    connection.query('SELECT * FROM diplome WHERE id=?', [id], function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;

        } else {

            res.send({ data: rows });
        }

    });


});
router.get('/IntituleFiliere/:id', function (req, res) {

    const id = Number(req.params.id);
    connection.query('SELECT * FROM filieres WHERE id=?', [id], function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;


        } else {

            res.send({ data: rows });
        }

    });


});
router.get('/ville/:id', function (req, res) {

    const id = Number(req.params.id);
    connection.query('SELECT * FROM ville WHERE id=?', [id], function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;


        } else {

            res.send({ data: rows });
        }

    });


});

router.get('/choix/:id', function (req, res) {

    const id = Number(req.params.id);
    connection.query('SELECT * FROM filieredestination WHERE id=?', [id], function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;


        } else {

            res.send({ data: rows });
        }

    });


});
router.get('/Etablissement/:id', function (req, res) {

    const id = Number(req.params.id);
    connection.query('SELECT * FROM Etablissement WHERE id=?', [id], function (err, rows) {

        if (err) {
            // @ts-ignore
            return err.message;


        } else {

            res.send({ data: rows });
        }

    });


});
router.get('/CandidatParfiliere/:id', function (req, res) {

    const id = Number(req.params.id);
    connection.query('SELECT * FROM candidats WHERE choix1=? or choix2=?', [id,id], function (err, rows) {

        if (err) {
            return err.message;


        } else {

            res.send(rows);
        }

    });


});



module.exports = router;