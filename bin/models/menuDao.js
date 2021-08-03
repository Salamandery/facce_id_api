var pg = require('../server/pool');
const logger = require('../server/logger');
module.exports.getMenu = function(application, req, res) {         
    var user = req.session.user;

    var _menu = {forms: [{}]};

    pg.sqlPool("SELECT f.ds_form ds_form, f.label frmLabel, m.label mLabel FROM heat.papel_usuario pu inner join heat.modulo_papel mp on pu.cd_papel = mp.cd_papel inner join heat.modulos m on mp.cd_modulo = m.cd_modulo inner join heat.modulo_form mf on mp.cd_modulo = mf.cd_modulo inner join heat.forms f on f.cd_form = mf.cd_form  WHERE cd_usuario = '"+user+"' order by m.label asc, f.ordem asc", function(result_papel) {
        let label = [];
        let idx   = 0;
        if (result_papel.rowCount > 0) {

            for (var i = 0; i < result_papel.rowCount; i++) {
                let exists = false;
                idx = label.indexOf(result_papel.rows[i].mlabel);

                if (idx == -1) {
                    label.push(result_papel.rows[i].mlabel);
                    idx = label.indexOf(result_papel.rows[i].mlabel);
                } else {
                    exists = true;
                }

                if (!exists) {
                    _menu.forms[i] = "<menu>"+label[idx]+" <span class='caret'></span></menu>";
                    _menu.forms[i] += "<a class='actUser' href='#' onclick=contentPG('"+result_papel.rows[i].ds_form+"')><submenu>"+result_papel.rows[i].frmlabel+"</submenu></a>";
                } else {
                    _menu.forms[i] = "<a class='actUser' href='#' onclick=contentPG('"+result_papel.rows[i].ds_form+"')><submenu>"+result_papel.rows[i].frmlabel+"</submenu></a>";
                }
            }
        }
        res.send(_menu);
        logger.log(0, `trying: ${result_papel}`,"getMenu");
    });

    function find_duplicate_in_array(arra1) {
        var object = {};
        var result = [];
    
        arra1.forEach(function (item) {
            if(!object[item])
                object[item] = 0;
            object[item] += 1;
        })
    
        for (var prop in object) {
            if(object[prop] >= 2) {
                result.push(prop);
            }
        }
        return result;
    }
}