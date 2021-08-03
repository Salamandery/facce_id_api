const eValidator = require('express-validator');
module.exports = function(application) {

    application.get('/login', function(req, res){
        application.bin.controllers.login.login(application, req, res);
    });
    application.post('/mobileAuth', function(req, res) {
        const { user, pass, me } = req.body;

        if (user) {
            application.bin.controllers.login.mobileAuth(application, req, res);
        } else {
            return res.json({error: "Usuário não pode ser nulo"});
        }
    });
    application.post('/auth', [
        eValidator.check('login', 'O campo usuário não pode ser nulo.').not().isEmpty(),
        eValidator.check('password', 'O campo senha não pode ser nulo.').not().isEmpty(),

    ], (req, res) => {
        const dadosForm = req.body;
        const errors = eValidator.validationResult(req); 
        if (!errors.isEmpty()) {
            res.json({msg: 'O usuário ou senha não pode ser nulo'});
        } else {
            application.bin.controllers.login.auth(application, req, res);
        }
    });
}
