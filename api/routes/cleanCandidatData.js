var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


// @ts-ignore
router.get('/', function (req, res) {
    const sql=`
    
    `;
    connection.query(`select 
	Numcondidature,    CIN,    CNE,    nomFr,    nomAr,    prenomFr,    prenomAr,
    email,    DateDeNaissance,    LieuDeNaissance,    Adresse,    Tel,    
    bac.Intitule as bac,    noteBac,    			Anneebac, 
    diplome.Intitule as DiplomeObtenu,
    filieres.Intitule as IntituleFiliere ,    				
    Etablissement.Nom as Etablissement,
    villes.Nom as ville,    MoyenneDiplome,    AnneeDiplome, 
    filieredestination1.Intitule as choix1, 
    filieredestination2.Intitule as choix2
    from 
    candidats
    INNER JOIN
    bac on candidats.IntituleBAC=bac.id
    INNER JOIN
    diplome on candidats.DiplomeObtenu=diplome.id
    INNER JOIN
    filieres on candidats.IntituleFiliere=filieres.id
    INNER JOIN
    etablissement on candidats.Etablissement=etablissement.id
    INNER JOIN
    villes on candidats.ville=villes.id
    INNER JOIN
    filieredestination as filieredestination1  on candidats.choix1=filieredestination1.id
    INNER JOIN
    filieredestination as filieredestination2 on candidats.choix2=filieredestination2.id        
    `, function (err, rows) {

        if (err) console.log(err);
         else {

            res.send(rows);
        }

    });

});
module.exports = router;