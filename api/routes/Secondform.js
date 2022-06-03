var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


router.post('/', (req, res) => {
  var userdata = req.body;
    const IdCompte= userdata.IdCompte;  
    const CIN = userdata.CIN;
    const CNE = userdata.CNE;
    const nomFr = userdata.firstName;
    const nomAr = userdata.lastNameAr;
    const prenomFr = userdata.lastName;
    const prenomAr = userdata.firstNameAr;
    const email = userdata.email;
    const DateDeNaissance = userdata.dob;
    const LieuDeNaissance = userdata.LieuDeNaissance;
    const Adresse = userdata.Adresse;
    const Tel = userdata.telephone;
    const IntituleBAC = userdata.Bac.id;
    const noteBac = userdata.noteBac;
    const Anneebac = userdata.anneBac;
    const DiplomeObtenu = userdata.diplome.id;
    const Etablissement = userdata.etablissement.id;
    const IntituleFiliere = userdata.filiereDip.id
    const MoyenneDiplome = userdata.MoyenneDiplome;
    const AnneeDiplome = userdata.AnneeDiplome;
    const choix1 = userdata.choix1.id;
    const choix2 = userdata.choix2.id
  
    var sql = `
    INSERT INTO candidats 
    (IdCompte, CIN, CNE, nomFr,nomAr,
         prenomFr,prenomAr, email, DateDeNaissance,
          LieuDeNaissance, Adresse, Tel, IntituleBAC,
          noteBac,Anneebac,ville,
           DiplomeObtenu, IntituleFiliere,Etablissement,
           MoyenneDiplome,
           AnneeDiplome,choix1,choix2) 
           VALUES (?)`;
  
  var values =[IdCompte, CIN, CNE, nomFr,nomAr,prenomFr, prenomAr, email,
     DateDeNaissance, LieuDeNaissance, Adresse, Tel,
      IntituleBAC,noteBac,Anneebac,1, DiplomeObtenu,
      IntituleFiliere,Etablissement ,MoyenneDiplome,AnneeDiplome,choix1,choix2]
   
    connection.query(sql.replace(/\n/g, ''),[values], function (err, response) {
      if (err) {
        return res.json({ "message": err, "success": false });

    }
    return res.json({ "message": response.message, "success": true });
    });
 
   
 
});


module.exports = router;
