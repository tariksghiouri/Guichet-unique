var express = require('express');
var router = express.Router();
var connection  = require('../connections/connection');
// var connection  = require('../connections/database');
 

app.post('/', function(req, res, next) {
    var CIN = req.body.CIN
    var CNE = req.CNE
    var nomFr = req.body.nomFr
    var prenomFr = req.body.prenomFr;
    var email = req.body.email;
    var DateDeNaissance = req.body.DateDeNaissance;
    var LieuDeNaissance = req.body.LieuDeNaissance;
    var Adresse = req.body.Adresse;
    var Tel = req.body.Tel;
    var IntituleBAC  = req.body.IntituleBAC;
    var DiplomeObtenu = req.body.DiplomeObtenu;
    var IntituleFiliere  = req.body.IntituleFiliere;
    var Etablissement  = req.body.etablissement;
    var ville  = req.body.ville;
    var Moyenne1année  = req.body.Moyenne1année;
    var Moyenne2année  = req.body.Moyenne1année;
    var MoyenneDiplôme  = req.body.MoyenneDiplôme;
    var AnnéeDiplôme  = req.body.AnnéeDiplôme;
   
    var sql = `INSERT INTO candidats (CIN, CNE, nomFr, prenomFr,
                                        email, DateDeNaissance,LieuDeNaissance,
                                        Adresse,Tel,IntituleBAC ,DiplomeObtenu,IntituleFiliere ,
                                        Etablissement ,ville,Moyenne1année,Moyenne2année,MoyenneDiplôme,
                                        AnnéeDiplôme)
VALUES ("${CIN}","${CNE}","${nomFr}","${prenomFr}","${email}",
      "${DateDeNaissance}","${LieuDeNaissance}","${Adresse}","${Tel}"
      ,"${IntituleBAC}","${DiplomeObtenu}","${IntituleFiliere}")
      ,"${Etablissement}","${ville}","${Moyenne1année}")
      ,"${Moyenne2année}","${MoyenneDiplôme}","${AnnéeDiplôme}")`;
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      req.flash('success', 'Data added successfully!');
      res.redirect('/');
    });
  });
 
 
module.exports = router;