const express=require('express');
var cors=require('cors');
const con=require('./connection');

const app= express();
app.use(cors());
app.use(express.urlencoded({extende :true}));
app.use(express.json());


module.exports=app;