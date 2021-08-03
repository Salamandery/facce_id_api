module.exports = function(application, req, res) {
    application.get('/sair', function(req, res){
        application.bin.controllers.sair.logout(application, req, res);
    });
}
