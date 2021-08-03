module.exports.nav = function(application, req, res) {
    application.bin.models.navDao.getNav(application, req, res);
};