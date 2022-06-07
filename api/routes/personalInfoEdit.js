var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


router.post('/', (req, res) => {
    var userdata = req.body;

    const IdCompte = userdata.IdCompte
    const CIN = userdata.CIN;
    const nomFr = userdata.lastName;
    const nomAr = userdata.lastNameAr;
    const prenomFr = userdata.firstName;
    const prenomAr = userdata.firstNameAr;
    const email = userdata.email;
    const DateDeNaissance = userdata.dob;
    const LieuDeNaissance = userdata.LieuDeNaissance;
    const Adresse = userdata.Adresse;
    const Tel = userdata.telephone;
  
    const sql = `UPDATE 
    candidats
    SET
    CIN ="${CIN}" ,
    nomFr ="${nomFr}",
    nomAr = "${nomAr}",
    prenomFr = "${prenomFr}",
    prenomAr = "${prenomAr}",
    email = "${email}",
    DateDeNaissance ="${DateDeNaissance}",
    LieuDeNaissance ="${LieuDeNaissance}",
    Adresse ="${Adresse}",
    Tel ="${Tel}",
    ville =1
    WHERE
   candidats.IdCompte = ${IdCompte}`;
  
  

    connection.query(sql.replace(/\n/g, ''), function (err, response) {
        if (err) {
            return res.json({ "message": err, "success": false });

        }
        return res.json({ "message": response.message, "success": true });
    });



});


module.exports = router;