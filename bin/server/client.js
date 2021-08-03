var con = require('../server/conCli');

var connectClient = con();

module.exports = {
    sqlClient: function sqlClient (sql, callback) {
        connectClient.query(sql, (err, res) => {
            if (err) {
                callback(err.stack)
            } else  {
                callback(res)
            }
            connectClient.end()
        })
    },
    closeCon: function closeCon() {
        connectClient.query(sql, (err, res) => {
            connectClient.end()
        })
    }
}
