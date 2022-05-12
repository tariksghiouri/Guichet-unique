var express = require('express');
var router = express.Router();
var connection  = require('../connections/connection');
// var connection  = require('../connections/database');
 

router.post('/', (req, res)=> {
    var userdata=req.body;
    console.log(userdata);
    // console.log(use);
    // var CIN = req.body.CIN
    // var CNE = req.CNE
    // var nomFr = req.body.nomFr
    // var prenomFr = req.body.prenomFr;
    // var email = req.body.email;
    // var DateDeNaissance = req.body.DateDeNaissance;
    // var LieuDeNaissance = req.body.LieuDeNaissance;
    // var Adresse = req.body.Adresse;
    // var Tel = req.body.Tel;
    // var IntituleBAC  = req.body.IntituleBAC;
    // var DiplomeObtenu = req.body.DiplomeObtenu;
    // var IntituleFiliere  = req.body.IntituleFiliere;
    // // var Etablissement  = req.body.etablissement;
    // // var ville  = req.body.ville;
    // var Moyenne1année  = req.body.Moyenne1année;
    // var Moyenne2année  = req.body.Moyenne1année;
    // var MoyenneDiplôme  = req.body.MoyenneDiplôme;
    // var AnnéeDiplôme  = req.body.AnnéeDiplôme;

    // var choix1  = req.body.choix1;
    // var choix2  = req.body.choix2;

   
//     var sql = `INSERT INTO candidats (CIN, CNE, nomFr, prenomFr,
//                                         email, DateDeNaissance,LieuDeNaissance,
//                                         Adresse,Tel,IntituleBAC ,DiplomeObtenu,IntituleFiliere ,
//                                       Moyenne1année,Moyenne2année,MoyenneDiplôme,
//                                         AnnéeDiplôme,choix1,choix2)
// VALUES ("${CIN}","${CNE}","${nomFr}","${prenomFr}","${email}",
//       "${DateDeNaissance}","${LieuDeNaissance}","${Adresse}","${Tel}"
//       ,"${IntituleBAC}","${DiplomeObtenu}","${IntituleFiliere}")
//       ,"${Etablissement}","${ville}","${Moyenne1année}")
//       ,"${Moyenne2année}","${MoyenneDiplôme}","${AnnéeDiplôme}")`;
    // db.query(sql, function(err, result) {
    //   if (err) throw err;
    //   console.log('record inserted');
    //   req.flash('success', 'Data added successfully!');
    //   res.redirect('/');
      
    // });
    return res.json("lol");
  });
 
 
module.exports = router;