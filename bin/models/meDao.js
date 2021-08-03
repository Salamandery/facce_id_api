var pg   = require('../server/pool');
const logger = require('../server/logger');
module.exports.getMe = function(me, callback) {
    pg.sqlPool("SELECT ds_empresa FROM heat.multi_empresa WHERE cd_multi_empresa = "+me, function(result) {
        if (result.rowCount > 0) {
            callback(result.rows[0].ds_empresa);
        }
        logger.log(0, `trying: ${result}`,"getMe");
    });
};