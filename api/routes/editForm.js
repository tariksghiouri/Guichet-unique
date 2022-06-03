var express = require('express');
var router = express.Router();
var connection = require('../connections/connection');
// var connection  = require('../connections/database');


router.post('/', (req, res) => {
  var userdata = req.body;

 
    const NumcondidatureReel=userdata.NumcondidatureReel
    const IntituleBAC = userdata.Bac.id;
    const noteBac = userdata.noteBac;
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
    IntituleBAC =${IntituleBAC},
    noteBac =${noteBac},
    DiplomeObtenu =${DiplomeObtenu},
    IntituleFiliere =${IntituleFiliere},
    Etablissement =${Etablissement},
    ville =1,
    MoyenneDiplome =${MoyenneDiplome},
    AnneeDiplome ="${AnneeDiplome}",
    choix1 =${choix1},
    choix2 =${choix2}
    WHERE
   candidats.NumcondidatureReel = ${NumcondidatureReel}`;
  
  
   
    connection.query(sql.replace(/\n/g, ''), function (err, response) {
      if (err) {
        return res.json({ "message": err, "success": false });

    }
    return res.json({ "message": response.message, "success": true });
    });
  
   
 
});


module.exports = router;

function isdatavalid(userdata) {
  //all data is valid 
//   for (const data in userdata){
//     if (data===undefined) {
//       return false;
      
//     }
   
//  }



  return true;
}
