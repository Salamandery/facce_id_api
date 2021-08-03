var pg = require('../server/pool');
var ora = require('../server/oradb');
const logger = require('../server/logger');
module.exports.menu = function (application, req, res) {
    application.bin.models.menuDao.getMenu(application, req, res);
};
module.exports.menu_social = function (application, req, res) {
    application.bin.models.menuSocialDao.getMenu(application, req, res);
};
module.exports.getMenu = function (application, req, res) {
    var user = req.params.user;

    var _menu = [];

    pg.sqlPool("SELECT f.ds_form ds_form, f.label frmLabel, m.label mLabel FROM heat.papel_usuario pu inner join heat.modulo_papel mp on pu.cd_papel = mp.cd_papel inner join heat.modulos m on mp.cd_modulo = m.cd_modulo inner join heat.modulo_form mf on mp.cd_modulo = mf.cd_modulo inner join heat.forms f on f.cd_form = mf.cd_form  WHERE cd_usuario = '" + user + "' and f.sn_ativo = 'S' AND m.sn_ativo = 'S' order by m.label asc, f.ordem asc", function (result_papel) {
        let label = [];
        let idx = 0;
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
                    _menu[idx] = {
                        label: {
                            name: result_papel.rows[i].mlabel,
                            forms: [{
                                name: result_papel.rows[i].frmlabel,
                                path: result_papel.rows[i].ds_form,
                            }],
                    }};
                } else {
                    _menu[idx] = {
                        label: {
                            name: result_papel.rows[i].mlabel,
                            forms: [
                                ..._menu[idx].label.forms,
                                {
                                    name: result_papel.rows[i].frmlabel,
                                    path: result_papel.rows[i].ds_form,
                                }
                            ],
                    }};
                }
            }
        }
        res.json(_menu);
        logger.log(0, `trying: ${result_papel}`, "getMenu");
    });
}