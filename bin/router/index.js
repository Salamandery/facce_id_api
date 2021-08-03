const ora = require("../server/oradb");
const eValidator = require("express-validator");
const logger = require("../server/logger");
module.exports = function (application) {
  application.get("/", function (req, res) {
    var machine = req.headers["user-agent"].indexOf("Mobile");

    if (machine == -1) {
      application.bin.controllers.index.homePC(application, req, res);
    } else {
      application.bin.controllers.index.homeMobile(application, req, res);
    }
  });
  application.get("/getInfoMachine", function (req, res) {
    var machine = req.headers["user-agent"].indexOf("Mobile");

    if (machine == -1) {
      application.bin.controllers.index.getInfoMachine(application, req, res);
    } else {
      application.bin.controllers.index.getInfoMachine(application, req, res);
    }
  });
  application.post("/cliente_auth", (req, res) => {
    const { clienteuser } = req.body;
    if (clienteuser === undefined) {
      return res.json({ msg: {}, error: "error.." });
    } else {
      ora.sqlQuery(
        "SELECT cd_usuario FROM dbasgu.usuarios WHERE cd_usuario = '" +
          clienteuser.toUpperCase() +
          "'",
        function (str) {
          logger.log(0, `trying: ${str}`, "REACT: cliente_auth");

          if (!str.rows[0]) return res.status(200).json();

          const CD_USUARIO = str.rows[0].CD_USUARIO;

          return res.json(CD_USUARIO);
        }
      );
    }
  });
};
