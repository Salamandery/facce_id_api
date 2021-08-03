const ora = require('oracledb');
const log = require('../server/logger');
const dnata = new Buffer.from(process.env.ORADNATA, 'base64').toString('ascii'); 
const pata  = new Buffer.from(process.env.ORAPATA, 'base64').toString('ascii');
const connString = new Buffer.from(process.env.ORASTRING, 'base64').toString('ascii');
var config = { "connectString": connString, "user": dnata, "password": pata };
ora.outFormat = ora.OBJECT;
ora.autoCommit = true;

module.exports = {
   sqlQuery: function sqlQuery (sql, callback) {  
    ora.getConnection(config, function(err, connection){
        if (err) {
            console.log(err.stack)
            log.log(0, err.stack);
            return
        }
        connection.execute(sql, async (err, res) => {
            if (err) {
                callback(err.stack)
                log.log(0, err.stack);
            } else  {
                callback(res);
                if (connection) {
                    try {
                        await connection.close();
                        await log.log(0, "connection released", "ORA");
                    } catch(err) {
                        console.log(err);
                        log.log(0, err);
                    }
                }
            }
        });
    });
   }
} 