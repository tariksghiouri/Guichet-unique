var express = require('express');
var router = express.Router();
var connection  = require('../connections/connection');

// var connection  = require('../connections/database');
 

router.get('/:id', function(req, res) {

    // if (!req.params.id) {
    //     res.json({ success: false, message: 'pas de filieres' });
    // }
    // else {
        // console.log(req.params.id);
   
        const id =Number(req.params.id);
        connection.query('SELECT * FROM filieres WHERE type_diplome=?',[id],function(err,rows)     {
 
        if(err){
         req.flash('error', err); 
          
        }else{
            
            res.send({data:rows});
        }
                            
         });
        
        
    });
 
 
module.exports = router;