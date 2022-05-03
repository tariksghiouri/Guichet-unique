var express = require('express');
var router = express.Router();
var connection  = require('../connections/connection');
// var connection  = require('../connections/database');
 

router.get('/', function(req, res, next) {
      
 connection.query('SELECT id,abreviation, Intitule FROM diplome',function(err,rows)     {
 
        if(err){
         req.flash('error', err); 
          
        }else{
            
            res.send({data:rows});
        }
                            
         });
        
    });
 
 
module.exports = router;