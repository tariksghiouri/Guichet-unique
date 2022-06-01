var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


router.post('/', (req, res) => {
  var userdata = req.body;
  // id
  console.log(req);
  // // details perso

  // console.log(Number(userdata.user));
  // console.log(userdata.personelinfos.nomFr);
  // console.log(userdata.personelinfos.prenomFr);
  // console.log(userdata.personelinfos.nomAr);
  // console.log(userdata.personelinfos.prenomAr);
  // console.log(userdata.personelinfos.email);
  // console.log(userdata.personelinfos.LieuDeNaissance);
  // console.log(userdata.personelinfos.cin);
  // console.log(userdata.personelinfos.cne);
  // console.log(userdata.personelinfos.phone);
  // console.log(userdata.personelinfos.datenaiss);
  // //education
  // console.log(userdata.education.annediplo);
  // console.log(userdata.education.anneebac);
  // console.log(userdata.education.bac.id);
  // console.log(userdata.education.diplome.id);
  // console.log(userdata.education.filC.id);
  // console.log(userdata.education.notebac);
  // console.log(userdata.education.notediplo);
  // // address
  // console.log(userdata.address);
  // // choices
  // console.log(userdata.choices.filterN1.id);
  // console.log(userdata.choices.filterN2.id);

  var IdCompte = userdata.user;
  var CIN = userdata.personelinfos.cin;
  var CNE = userdata.personelinfos.cne;
  var nomFr = userdata.personelinfos.nomFr;
  var nomAr = userdata.personelinfos.nomAr;
  var prenomFr = userdata.personelinfos.prenomFr;
  var prenomAr = userdata.personelinfos.prenomAr;
  var email = userdata.personelinfos.email;
  var DateDeNaissance = userdata.personelinfos.datenaiss;
  var LieuDeNaissance = userdata.personelinfos.LieuDeNaissance;
  var Adresse = userdata.address;
  var Tel = userdata.personelinfos.phone;
  var IntituleBAC = userdata.education.bac.id;
  var noteBac = userdata.education.notebac;
  var Anneebac = userdata.education.anneebac;
  var DiplomeObtenu = userdata.education.diplome.id;
  var Etablissement = userdata.education.etablissement.id;
  var IntituleFiliere = userdata.education.filC.id
  // var Moyenne1annee = userdata.education.notediplo;
  // var Moyenne2annee = userdata.education.notediplo;
  var MoyenneDiplome = userdata.education.notediplo;
  var AnneeDiplome = userdata.education.annediplo;
  var choix1 = userdata.choices.filterN1.id;
  var choix2 = userdata.choices.filterN2.id

  
  var values =[IdCompte, CIN, CNE, nomFr,nomAr,prenomFr, prenomAr, email, DateDeNaissance, LieuDeNaissance, Adresse, Tel, IntituleBAC,noteBac,Anneebac, DiplomeObtenu, IntituleFiliere,Etablissement,  1   ,MoyenneDiplome,AnneeDiplome,choix1,choix2]
  var sql = "INSERT INTO candidats (IdCompte, CIN, CNE, nomFr,nomAr, prenomFr,prenomAr, email, DateDeNaissance, LieuDeNaissance, Adresse, Tel, IntituleBAC,noteBac,Anneebac, DiplomeObtenu, IntituleFiliere,Etablissement ,ville,MoyenneDiplome,AnneeDiplome,choix1,choix2) VALUES (?)";

 
  connection.query(sql, [values],function(err, response) {
    if (err) {
      return res.json({"message":"Impossible d'ajouter' l'enregistrement", "success": false});
      
    }
    return res.json({"message":"insere avec sucess", "success": true});

});

  
});
router.get('/:CNE', (req, res) => {
  const CNE =Number(req.params.CNE);
  var sql2=`SELECT COUNT(*) as numberOfcandidatures FROM candidats WHERE IdCompte=?  `;

  connection.query(sql2,[CNE],function(err, response) {
    if (err) {
      throw err;
      
    }else{
      res.send(response);
  
  
    }
  
  });
})


module.exports = router;