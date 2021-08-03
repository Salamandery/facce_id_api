//const logger = require('../server/logger');
module.exports.logout = function(application, req, res) {
    req.session.destroy(function(err){
        res.redirect('/login');
        //logger.log(0, `trying: ${err}`,"logout");
    });
};