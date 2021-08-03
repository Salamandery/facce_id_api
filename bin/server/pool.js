var con = require("../server/conPool");

var connectPool = con();

module.exports = {
  sqlPool: function sqlPool(sql, callback) {
    connectPool.query(sql, (err, res) => {
      if (err) {
        callback(err.stack);
      } else {
        callback(res);
      }
    });
  }
};
