var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


router.post('/', (req, res) => {
  var userdata = req.body;

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
  
  const sql = `UPDATE
  candidats
  SET
  CIN ="${CIN}" ,
  CNE = "${CNE}",
  nomFr ="${nomFr}",
  nomAr = "${nomAr}",
  prenomFr = "${prenomFr}",
  prenomAr = "${prenomAr}",
  email = "${email}",
  DateDeNaissance ="${DateDeNaissance}",
  LieuDeNaissance ="${LieuDeNaissance}",
  Adresse ="${Adresse}",
  Tel ="${Tel}",
  IntituleBAC =${IntituleBAC},
  noteBac =${noteBac},
  Anneebac ="${Anneebac}",
  DiplomeObtenu =${DiplomeObtenu},
  IntituleFiliere =${IntituleFiliere},
  Etablissement =${Etablissement},
  ville =1,
  MoyenneDiplome =${MoyenneDiplome},
  AnneeDiplome ="${AnneeDiplome}",
  choix1 =${choix1},
  choix2 =${choix2}
  WHERE
 candidats.Numcondidature = ${userdata.numCandidature}`;


  connection.query(sql.replace(/\n/g, ''), function (err, response) {
    if (err) throw err;
    console.log("1 record updated");

  });
  console.log(sql);
});


module.exports = router;