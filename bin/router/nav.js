module.exports = function(application) {
    application.get('/nav', function(req, res){
        application.bin.controllers.nav.nav(application, req, res);
    });
}