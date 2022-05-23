var express = require('express');
var router = express.Router();
var connection  = require('../connections/connection');

// var connection  = require('../connections/database');
 

router.get('/:id', function(req, res) {

    // if (!req.params.id) {
    //     res.json({ success: false, message: 'pas de filieres' });
    // }
    // else {
        console.log(req.params.id);
   
        const id =Number(req.params.id);
        connection.query
        ('select etablissement.Nom, etablissement.abreviation, villes.Nom AS ville from relationdiplomeetablissement INNER JOIN etablissement ON relationdiplomeetablissement.idEtablissement=etablissement.id INNER JOIN villes ON etablissement.ville_id=villes.id WHERE relationdiplomeetablissement.idDiplome=? ',[id],function(err,rows)     {
 
        if(err){
         // @ts-ignore
         req.flash('error', err); 
          
        }else{
            
            res.send({data:rows});
        }
                            
         });
        
        
    });
 
 
module.exports = router;