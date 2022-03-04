const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const eSession = require('express-session');
const dotEnv = require('dotenv');
const cors = require('cors');
const app = express();

dotEnv.config();
app.use(eSession({
    secret: "",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 12000000 }
}));
app.use(cors());
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


