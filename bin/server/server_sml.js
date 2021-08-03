const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const eSession = require('express-session');
const notEnv = require('dotenv');
const app = express();

notEnv.config();
app.use(eSession({
    secret: process.env.KEY_STRING,
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*app.get('/', (req, res) => {
    let data = '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 10.42.111.211)(PORT = 1521))(CONNECT_DATA =(SID= prdmv)))';  
    let buff = new Buffer(data);  
    let base64data = buff.toString('base64');
   res.send(base64data);
})*/
consign()
    .include('bin/router')
    .then('bin/models')
    .then('bin/controllers')
    .into(app);

module.exports = app;


