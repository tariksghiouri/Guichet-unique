require('dotenv').config();
const http =require('http');
const { routes } = require('./index');

const app =require("./index");
const server =http.createServer(app);

var filieres=require('./routes/home');
app.use('./filieres',filieres);


server.listen(process.env.PORT);
