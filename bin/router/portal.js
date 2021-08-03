const eValidator = require('express-validator');
module.exports = function(application) {
    application.get('/portal', function(req, res){
        application.bin.controllers.portal.intranetti(application, req, res, undefined);
    });
    application.get('/portal_rede', function(req, res){
      application.bin.controllers.portal.intranetti_social(application, req, res, undefined);
    });
    application.get('/push_gen_papel', function(req, res) {
      application.bin.controllers.portal.push_gen_papel(application, req, res);
    });
    application.get('/push_gen_mod', function(req, res) {
      application.bin.controllers.portal.push_gen_mod(application, req, res);
    });
    application.get('/push_gen_users', function(req, res) {
      application.bin.controllers.portal.push_gen_users(application, req, res);
    });
    application.get('/push_gen_form', function(req, res) {
      application.bin.controllers.portal.push_gen_form(application, req, res);
    });
    application.get('/push_form_mod', function(req, res) {
      application.bin.controllers.portal.push_form_mod(application, req, res);
    });
    application.get('/push_mod_papel', function(req, res) {
      application.bin.controllers.portal.push_mod_papel(application, req, res);
    });
    application.get('/gen_modulo', function(req, res) {
      application.bin.controllers.portal.gen_modulo(application, req, res);
    });
    application.get('/gen_user', function(req, res) {
      application.bin.controllers.portal.gen_user(application, req, res);
    });
    application.get('/gen_papel', function(req, res) {
      application.bin.controllers.portal.gen_papel(application, req, res);
    });
    application.get('/get_form_to_select', function(req, res) {
      application.bin.controllers.portal.selectForm(application, req, res);
    });
    application.get('/get_modulo_to_select', function(req, res) {
      application.bin.controllers.portal.selectModulo(application, req, res);
    });
    application.get('/get_user_to_select', function(req, res) {
      application.bin.controllers.portal.selectUser(application, req, res);
    });
    application.get('/get_papel_to_select', function(req, res) {
      application.bin.controllers.portal.selectPapel(application, req, res);
    });
    application.post('/ins_form', [
      //eValidator.check('cd', 'O campo código não pode ser nulo.').not().isEmpty(),
      eValidator.check('ord', 'O campo ordem não pode ser nulo.').not().isEmpty(),
      eValidator.check('ds', 'O campo descrição não pode ser nulo.').not().isEmpty(),
      eValidator.check('path', 'O campo path não pode ser nulo.').not().isEmpty(),
    ], (req, res) => {
      const errors = eValidator.validationResult(req); 
      if (!errors.isEmpty()) {
        res.status(401).json(errors);
      } else {
        application.bin.controllers.portal.ins_form(application, req, res);
      }
    });
    application.post('/ins_form_mod', [
      eValidator.check('form', 'O campo form não pode ser nulo.').not().isEmpty(),
      eValidator.check('mod', 'O campo módulo não pode ser nulo.').not().isEmpty(),
    ], (req, res) => {
      const errors = eValidator.validationResult(req); 
      if (!errors.isEmpty()) {
        res.status(401).json(errors);
      } else {
        application.bin.controllers.portal.ins_form_mod(application, req, res);
      }
    });
    application.post('/ins_mod_papel', [
      eValidator.check('papel', 'O campo papel não pode ser nulo.').not().isEmpty(),
      eValidator.check('mod', 'O campo módulo não pode ser nulo.').not().isEmpty(),
    ], (req, res) => {
      const errors = eValidator.validationResult(req); 
      if (!errors.isEmpty()) {
        res.status(401).json(errors);
      } else {
        application.bin.controllers.portal.ins_mod_papel(application, req, res);
      }
    });
    application.post('/ins_papel', [
      //eValidator.check('cd', 'O campo código não pode ser nulo.').not().isEmpty(),
      eValidator.check('ds', 'O campo descrição não pode ser nulo.').not().isEmpty(),
      //eValidator.check('path', 'O campo path não pode ser nulo.').not().isEmpty(),
    ], (req, res) => {
      const errors = eValidator.validationResult(req); 
      if (!errors.isEmpty()) {
        res.json(errors);
      } else {
        application.bin.controllers.portal.ins_papel(application, req, res);
      }
    });
    application.post('/ins_mod', [
      //eValidator.check('cd', 'O campo código não pode ser nulo.').not().isEmpty(),
      eValidator.check('ds', 'O campo descrição não pode ser nulo.').not().isEmpty(),
      eValidator.check('label', 'O campo label não pode ser nulo.').not().isEmpty(),
    ], (req, res) => {
      const errors = eValidator.validationResult(req); 
      if (!errors.isEmpty()) {
        res.status(401).json(errors);
      } else {
        application.bin.controllers.portal.ins_mod(application, req, res);
      }
    });
    application.post('/ins_user_papel', [
      eValidator.check('user', 'O campo usuário não pode ser nulo.').not().isEmpty(),
      eValidator.check('papel', 'O campo papel não pode ser nulo.').not().isEmpty(),
    ], (req, res) => {
      const errors = eValidator.validationResult(req); 
      if (!errors.isEmpty()) {
        res.status(401).json(errors);
      } else {
        application.bin.controllers.portal.ins_user_papel(application, req, res);
      }
    });
    application.put('/change_user_info', function(req, res) {
      application.bin.controllers.portal.change_user_info(application, req, res);
    });
    application.get('/user_info', function(req, res) {
      application.bin.controllers.portal.user_info(application, req, res);
    });
}
