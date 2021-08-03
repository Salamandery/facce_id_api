const moment = require("moment");
const ora = require("../server/oradb");
var pg = require("../server/pool");
//const logger = require('../server/logger');
module.exports.homePC = function (application, req, res) {
  var _user = req.session.solic;
  if (_user == undefined) {
    application.bin.models.machineDao.getMachine(
      application,
      req,
      res,
      function (str) {
        res.render("home/index.ejs", {
          ipMe: str.me,
          ip: str.ip,
          hr: str.hours,
          valida: {},
          forms: {},
        });
      }
    );
  } else {
    application.bin.models.machineDao.getMachine(
      application,
      req,
      res,
      function (str) {
        res.render("home/index.ejs", {
          ipMe: str.me,
          ip: str.ip,
          hr: str.hours,
          valida: {},
          forms: _user,
        });
      }
    );
  }
};

module.exports.homeMobile = function (application, req, res) {
  var _user = req.session.solic;
  if (_user == undefined) {
    application.bin.models.machineDao.getMachine(
      application,
      req,
      res,
      function (str) {
        res.render("home/m_index.ejs", {
          ipMe: str.me,
          ip: str.ip,
          hr: str.hours,
          valida: {},
          forms: {},
        });
      }
    );
  } else {
    application.bin.models.machineDao.getMachine(
      application,
      req,
      res,
      function (str) {
        res.render("home/m_index.ejs", {
          ipMe: str.me,
          ip: str.ip,
          hr: str.hours,
          valida: {},
          forms: _user,
        });
      }
    );
  }
};
module.exports.getInfoMachine = function (application, req, res, errors) {
  var _user = req.session.solic;
  if (_user == undefined) {
    application.bin.models.machineDao.getMachine(
      application,
      req,
      res,
      function (str) {
        res.json({
          ipMe: str.me,
          ip: str.ip,
          hr: str.hours,
          valida: {},
          forms: "",
        });
      }
    );
  } else {
    application.bin.models.machineDao.getMachine(
      application,
      req,
      res,
      function (str) {
        res.json({
          ipMe: str.me,
          ip: str.ip,
          hr: str.hours,
          valida: {},
          forms: _user,
        });
      }
    );
  }
};
