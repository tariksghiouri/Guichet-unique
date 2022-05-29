var express = require('express');
var router = express.Router();
var connection  = require('../connections/connection');
// var connection  = require('../connections/database');
 

router.get('/', function(req, res, next) {
      
 connection.query('SELECT * FROM AnneeUiversitaire',function(err,rows)     {
 
        if(err){
         throw err;
          
        }else{
            
            res.send(rows);
        }
                            
         });
        
    });
 
 
module.exports = router;