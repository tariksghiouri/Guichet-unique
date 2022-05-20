var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  port:3306, 
  user: 'root',     
  password: '',      
  database: 'candidaturelp-ests'   
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;