const ora = require("../server/oradb");
//const logger = require('../server/logger');
module.exports.login = function(application, req, res) {
    res.render('login.ejs', {valida: {}, 
                             forms: {}});
}
module.exports.mobileAuth = function(application, req, res) {
    var user = req.body.login.toUpperCase();
    let pass = req.body.password;
    let buff = new Buffer.from(pass);  
    let data = buff.toString('base64');

    //logger.log(0, `trying: `,"mobileAuth");

    ora.sqlQuery("SELECT cd_usuario, name, cd_oficina, multi_oficina, tp_usuario, assinatura, email, usuario_mv FROM heat.usuarios WHERE cd_usuario = '"+user+"' and cd_senha = '"+data+"' AND SN_ATIVO = 'S'", function(result) {
        console.log(result);
        if (result.rowCount > 0) {
            return res.status(200).json({ok: "Acesso realizado",result});
        } else {
            return res.json({error: "Usuário inválido", body: req.body})
        }
    });
}
module.exports.auth = function(application, req, res) {
    var user = req.body.login.toUpperCase();
    let pass = req.body.password;
    let buff = new Buffer.from(pass);  
    let data = buff.toString('base64');
    console.log(req.body)
    
    ora.sqlQuery("SELECT * FROM facce_id.vdic_auth WHERE cnpj = '"+user+"' and cd_senha = '"+data+"'", function(result) {
        console.log(result);
        if (result.rows) {
            req.session.validado = true;
            req.session.user     = user;
            
            res.json({status: 200, msg: 'login realizado com sucesso!', data: result.rows, token: 'valido'});
        } else {
            var errors = [{
                msg: 'Usuário ou senha inválidos.',
            }];
            res.json(errors);
        }
        //logger.log(0, `trying: ${result}`,"auth");
    });
}