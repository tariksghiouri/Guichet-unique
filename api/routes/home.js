var express = require('express');
var router = express.Router();
var connection  = require('../connection');
 

router.get('/', function(req, res, next) {
      
 connection.query('SELECT filieres.Intitule,filieres.Effectif_maximal, staff.NomComplet, staff.email FROM filieres INNER JOIN staff ON filieres.cord=staff.id ',function(err,rows)     {
 
        if(err){
         req.flash('error', err); 
          
        }else{
            
            res.send({data:rows});
        }
                            
         });
        
    });
 
 
module.exports = router;