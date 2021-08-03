const ora = require('../server/oradb');
const pg  = require('../server/pool');
//const logger = require('../server/logger');
module.exports.intranetti = function(application, req, res, errors) {    
    if (req.session.validado) {
        let form = req.session.form;
        if (errors == undefined) {
            res.render('portal/portal.ejs', {valida: {}, form: form});
        } else {
            res.render('portal/portal.ejs', {valida: errors.array(), form: form});
        }
    } else {
        var errors = [{
            msg: 'É necessário efetuar o login.',
        }];

        res.render('login.ejs', {valida: errors, forms: {}});
    }
}
module.exports.push_gen_form = function(application, req, res) {
    pg.sqlPool("SELECT f.cd_form as cd_form, f.ds_form as ds_form, f.label as label, f.ordem as ordem, f.sn_ativo as sn_ativo FROM heat.forms f ORDER BY 1", function(result){
        //logger.log(0, `trying: ${result}`,"gen_form");
        res.json(result);
    });
}
module.exports.push_form_mod = function(application, req, res) {
    pg.sqlPool("SELECT f.cd_form as cd_form, f.label as label, m.cd_modulo as cd_modulo, m.nm_modulo as nm_modulo FROM heat.forms f INNER JOIN heat.modulo_form fm ON f.cd_form = fm.cd_form INNER JOIN heat.modulos m ON fm.cd_modulo = m.cd_modulo WHERE m.sn_ativo = 'S' and f.sn_ativo = 'S' ORDER BY 2, 3", function(result){
        //logger.log(0, `trying: ${result}`,"gen_form");
        res.json(result);
    });
}
module.exports.push_mod_papel = function(application, req, res) {
    pg.sqlPool("SELECT p.cd_papel, p.ds_papel, m.cd_modulo, m.label, m.nm_modulo FROM heat.papel p LEFT JOIN heat.modulo_papel mp ON p.cd_papel = mp.cd_papel left join heat.modulos m ON m.cd_modulo = mp.cd_modulo WHERE m.sn_ativo = 'S' and p.sn_ativo = 'S' ORDER BY 2, 3", function(result){
        //logger.log(0, `trying: ${result}`,"gen_form");
        res.json(result);
    });
}
module.exports.gen_modulo = function(application, req, res) {
    var _user = req.session.user;
    var _o    = req.session.o;

    if (_user == undefined || _o == undefined) {
        var _valida = [{
            'msg': 'É necessário efetuar o login.'
        }];
        
        res.render('login.ejs', {valida: _valida, forms: {}});
    } else {
        req.session.form = '/gen_modulo';
        res.render('portal/gen_modulo.ejs', {user: _user, forms: {}});
    }
}
module.exports.gen_papel = function(application, req, res) {
    var _user = req.session.user;
    var _o    = req.session.o;

    if (_user == undefined || _o == undefined) {
        var _valida = [{
            'msg': 'É necessário efetuar o login.'
        }];
        
        res.render('login.ejs', {valida: _valida, forms: {}});
    } else {
        req.session.form = '/gen_papel';
        res.render('portal/gen_papel.ejs', {user: _user, forms: {}});
    }
}
module.exports.push_gen_users = function(application, req, res) {
    pg.sqlPool("SELECT u.cd_usuario, p.cd_papel as cd_papel, p.ds_papel as ds_papel FROM heat.usuarios u INNER JOIN heat.papel_usuario pu ON u.cd_usuario = pu.cd_usuario INNER JOIN heat.papel p ON pu.cd_papel = p.cd_papel WHERE u.sn_ativo = 'S' ORDER BY 1, 2;", function(result) {
        res.send(result);
        //logger.log(0, `trying: ${result}`,"push_gen_users");
    });
}
module.exports.push_gen_mod = function(application, req, res) {
    pg.sqlPool("SELECT m.cd_modulo as cd_modulo, m.nm_modulo as nm_modulo, m.label as label, m.sn_ativo as sn_ativo FROM heat.modulos m WHERE m.sn_ativo = 'S' ORDER BY 1, 3", function(result) {
        res.send(result);
        //logger.log(0, `trying: ${result}`,"push_gen_mod");
    });
}
module.exports.push_gen_papel = function(application, req, res) {
    pg.sqlPool("SELECT p.cd_papel as cd_papel, p.ds_papel as ds_papel, p.sn_ativo as sn_ativo FROM heat.papel p ORDER BY 1, 3;", function(result) {
        //logger.log(0, `trying: ${result}`,"push_gen_papel");
        res.json(result);
    });
}
module.exports.gen_user = function(application, req, res) {
    var _user = req.session.user;
    var _o    = req.session.o;

    if (_user == undefined || _o == undefined) {
        var _valida = [{
            'msg': 'É necessário efetuar o login.'
        }];
        
        res.render('login.ejs', {valida: _valida, forms: {}});
    } else {
        req.session.form = '/gen_user';
        res.render('portal/gen_user.ejs', {user: _user, forms: {}});
    }
}
module.exports.selectUser = function(application, req, res) {
    const _me = req.session.me;
    var  _arr = '<option value="0" selected>< -- USUÁRIO -- ></option>';
    if (_me != undefined) {
        pg.sqlPool("SELECT cd_usuario FROM heat.usuarios WHERE sn_ativo = 'S' ORDER BY 1", function(str) {
            if (str.rows.length > 0) {
                for (var i = 0; i < str.rows.length; i++) {
                    _arr += "<option value='"+str.rows[i].cd_usuario+"'>"+str.rows[i].cd_usuario+"</option>"
                }
                res.send(_arr);
            }
            //logger.log(0, `trying: ${str}`,"selectUser");
        });
    }  else {
        res.send('nothing');
    }
}
module.exports.selectModulo = function(application, req, res) {
    pg.sqlPool("SELECT cd_modulo, nm_modulo FROM heat.modulos WHERE sn_ativo = 'S'", function(str) {
        res.json(str);
        //logger.log(0, `trying: ${str}`,"selectModulo");
    });
}
module.exports.selectPapel = function(application, req, res) {
    pg.sqlPool("SELECT cd_papel, ds_papel FROM heat.papel WHERE sn_ativo = 'S'", function(str) {
        res.json(str);
        //logger.log(0, `trying: ${str}`,"selectPapel");
    });
}
module.exports.selectForm = function(application, req, res) {
    pg.sqlPool("SELECT cd_form, label FROM heat.forms WHERE sn_ativo = 'S'", function(str) {
        res.json(str);
        //logger.log(0, `trying: ${str}`,"selectForm");
    });
}
module.exports.ins_form = function(application, req, res) {
    var _cd = req.body.cd;
    var _ds = req.body.ds;
    var _ord = req.body.ord;
    var _path = req.body.path;
    var _ativo = req.body.ativo;

    if (!_cd || _cd == '') {
        pg.sqlPool("INSERT INTO heat.forms(ds_form, label, ordem) VALUES ('"+_path+"', '"+_ds+"', "+_ord+")", function(str) {
            //logger.log(0, `trying: ${str}`,"ins_form");
            res.json(str);
        });
    } else {
        pg.sqlPool("UPDATE heat.forms SET ds_form = '"+_path+"', label = '"+_ds+"', ordem = "+_ord+", sn_ativo = '"+_ativo+"' WHERE cd_form = "+_cd, function(str) {
            //logger.log(0, `trying: ${str}`,"ins_form");
            res.json(str);
        });
    }
}
module.exports.ins_form_mod = function(application, req, res) {
    var _form = req.body.form;
    var _mod = req.body.mod;
    pg.sqlPool("INSERT INTO heat.modulo_form (cd_form, cd_modulo) VALUES ("+_form+", "+_mod+");", function(str) {
        //logger.log(0, `trying: ${str}`,"ins_form_mod");
        res.json(str);
    });
}
module.exports.ins_mod_papel = function(application, req, res) {
    var _papel = req.body.papel;
    var _mod = req.body.mod;
    pg.sqlPool("INSERT INTO heat.modulo_papel (cd_papel, cd_modulo) VALUES ("+_papel+", "+_mod+");", function(str) {
        //logger.log(0, `trying: ${str}`,"ins_mod_papel");
        res.json(str);
    });
}
module.exports.ins_user_papel = function(application, req, res) {
    var _papel = req.body.papel;
    var _user = req.body.user;
    pg.sqlPool("INSERT INTO heat.papel_usuario (cd_papel, cd_usuario) VALUES ("+_papel+", '"+_user+"');", function(str) {
        application.bin.controllers.portal.intranetti(application, req, res, undefined);
        //logger.log(0, `trying: ${str}`,"ins_user_papel");
    });
}
module.exports.ins_papel = function(application, req, res) {
    var _cd = req.body.cd;
    var _ds = req.body.ds.toUpperCase();
    var _sn = req.body.sn.toUpperCase();

    if (!_cd) {
        pg.sqlPool("INSERT INTO heat.papel(ds_papel) VALUES ('"+_ds+"')", function(str) {
            //logger.log(0, `trying: ${str}`,"ins_papel");
            res.json(str);
        });
    } else {
        pg.sqlPool("UPDATE heat.papel SET ds_papel = '"+_ds+"', sn_ativo = '"+_sn+"' WHERE cd_papel = "+_cd, function(str) {
            //logger.log(0, `trying: ${str}`,"ins_papel");
            res.json(str);
        });
    }
}
module.exports.ins_mod = function(application, req, res) {
    var _cd = req.body.cd;
    var _ds = req.body.ds.toUpperCase();
    var _label = req.body.label;
    var _ativo = req.body.ativo;

    if (!_cd) {
        pg.sqlPool("INSERT INTO heat.modulos (nm_modulo, label) VALUES ('"+_ds+"', '"+_label+"')", function(str) {
            application.bin.controllers.portal.intranetti(application, req, res, undefined);
            //logger.log(0, `trying: ${str}`,"ins_mod");
        });
    } else {
        pg.sqlPool("UPDATE heat.modulos SET nm_modulo = '"+_ds+"', label = '"+_label+"', sn_ativo = '"+_ativo+"' WHERE cd_modulo = "+_cd, function(str) {
            application.bin.controllers.portal.intranetti(application, req, res, undefined);
            //logger.log(0, `trying: ${str}`,"ins_mod");
        });
    }
}
module.exports.change_user_info = function(application, req, res) {
    const { name, cd_usuario, usuario_mv, password, oldPassword, confirmPassword, email, assinatura, multi_oficina, cd_oficina } = req.body; 
    let pass = undefined;

    if (oldPassword) {
        if (password === confirmPassword) {
            let buff = new Buffer.from(password); 
            pass = buff.toString('base64');
        } else {
            return res.status(401).json({msg: "As senhas não batem"});
        }
    }

    pg.sqlPool(`UPDATE heat.usuarios SET ${pass !== undefined ? `cd_senha = '${pass}',`: ''} usuario_mv = '${usuario_mv}', name = '${name}', email = '${email}', assinatura = '${assinatura}', multi_oficina = '${multi_oficina}', cd_oficina = ${cd_oficina}, user_atualiza = '${cd_usuario}', dt_atualiza = CURRENT_TIMESTAMP WHERE cd_usuario = '${cd_usuario}' AND sn_ativo = 'S'`, function(str) {
        //logger.log(0, `trying: ${str}`,"selectUser");
        return res.json(str);
    });
}
module.exports.user_info = function(application, req, res) {
    const { user } = req.body; 

    pg.sqlPool("SELECT cd_usuario, name, cd_oficina, multi_oficina, tp_usuario, assinatura, email, usuario_mv FROM heat.usuarios WHERE cd_usuario = '"+user+"' AND SN_ATIVO = 'S'", function(result) {
        if (result.rowCount > 0) {
            return res.status(200).json({ok: "Acesso realizado",result});
        } else {
            return res.json({error: "Usuário inválido", body: req.body})
        }
    });
}
module.exports.tb_to_mod = function(application, req, res) {

    pg.sqlPool("SELECT cd_mod_imp, nm_mod_imp, ds_mod_toner FROM heat.mod_imp where sn_ativo = 'S' order by 2 ASC", function(result){
        //logger.log(0, `trying: ${result}`,"tb_to_mod");
        res.json(result);
    });
}