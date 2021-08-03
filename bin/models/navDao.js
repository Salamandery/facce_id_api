var pg = require('../server/pool');
const logger = require('../server/logger');
module.exports.getNav = async function(application, req, res) {         
    var user = req.session.user;
    //var me   = req.session.me;

    var _nav = {
        home: "<ul><li style='float:left;'><a onclick='openMenu()' class='menuBarbtn'></a></li>",
        user: "<li style='position: absolute; right:0;' class='dropdownbar'><a onclick=contentPG('/dash_user')>"+user+"</a><ul><li><a href='/sair'>Logout</a></li></ul></li></ul>",
    };
    res.send(_nav);
}
