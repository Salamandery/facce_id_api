var ora = require('../server/oradb');
var pg = require('../server/pool');
const logger = require('../server/logger');
module.exports.getOficina = function(user, callback) {
    pg.sqlPool("SELECT cd_oficina FROM heat.usuarios WHERE cd_usuario = '"+user+"'", function(result) {
        if (result.rowCount > 0) {
            callback(result.rows[0].cd_oficina);
        }
        logger.log(0, `trying: ${result}`,"getOficina");
    });
}
module.exports.getInfoOS = function(o, user, callback) {
    if (user) {
        ora.sqlQuery("SELECT (SELECT COUNT(*) total FROM DBAMV.SOLICITACAO_OS WHERE CD_OFICINA in "+o+" AND to_char(DT_PEDIDO, 'dd/mm/yyyy') = TO_CHAR(SYSDATE,'dd/mm/yyyy') AND CD_RESPONSAVEL = '"+user+"') dia,"+
        "(SELECT COUNT(*) total FROM DBAMV.SOLICITACAO_OS WHERE CD_OFICINA in "+o+" AND TP_SITUACAO = 'C' AND to_char(DT_PEDIDO, 'mm/yyyy') = TO_CHAR(SYSDATE,'mm/yyyy') AND CD_RESPONSAVEL = '"+user+"') con,"+
        "(SELECT COUNT(*) total FROM DBAMV.SOLICITACAO_OS WHERE CD_OFICINA in "+o+" AND TP_SITUACAO = 'S' AND to_char(DT_PEDIDO, 'mm/yyyy') = TO_CHAR(SYSDATE,'mm/yyyy') AND CD_RESPONSAVEL = '"+user+"') sol,"+
        "(SELECT COUNT(*) total FROM DBAMV.SOLICITACAO_OS WHERE CD_OFICINA in "+o+" AND to_char(DT_PEDIDO, 'mm/yyyy') = TO_CHAR(SYSDATE,'mm/yyyy') AND CD_RESPONSAVEL = '"+user+"') mes FROM DUAL", function(result) {
            if (result.rows != undefined) {
                callback(result);
            }
            logger.log(0, `trying: ${result}`,"getInfoOS");
        });
    } else {
        callback("nothing");
    }
}
