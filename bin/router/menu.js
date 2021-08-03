module.exports = function(application) {
    application.get('/menu', function(req, res){
        application.bin.controllers.menu.menu(application, req, res);
    });
    application.get('/push_menu/:user', function(req, res){
        application.bin.controllers.menu.getMenu(application, req, res);
    });
    application.get('/menu_social', function(req, res){
        application.bin.controllers.menu.menu_social(application, req, res);
    });
}