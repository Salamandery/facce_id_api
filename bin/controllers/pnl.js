var ora = require('../server/oradb');
//const logger = require('../server/logger');
module.exports.legado = function(application, req, res) {
    req.session.form = '/pnl/pnl_os';
    res.render("pnl/pnl_os.ejs", {valida: {}});
}