const { Pool } = require("pg");

/* const dnata = new Buffer.from(process.env.PGDNATA, "base64").toString("ascii");
const pata = new Buffer.from(process.env.PGPATA, "base64").toString("ascii");
const hata = new Buffer.from(process.env.PGHATA, "base64").toString("ascii");
const tata = new Buffer.from(process.env.PGTATA, "base64").toString("ascii");
const data = new Buffer.from(process.env.PGDATA, "base64").toString("ascii"); */

module.exports = function() {
  return (pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "heat.monitor",
    password: "",
    port: 5432
  }));
};
