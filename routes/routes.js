var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next) {
    response.render('index', {titulo: 'WeComp'});
});

router.get('/login', function(request, response, next) {
    response.render('login', {titulo: 'Login | WeComp'});
});

router.post('/postLogin', function(request, response, next) {
    var loginDAO = require('../DAO/loginDAO');
	var user = new loginDAO();
	user.find(request.body, response, request);
});

router.post('/postRegisterUser', function(request, response, next) {
	var registerDAO = require('../DAO/registerDAO');
	var newUser = new registerDAO()
	newUser.registerUser(request.body, response)
});

router.get('/programacao', function(request, response, next) {
	if(logged.user){
		if(logged.user.profile == 0){
			response.render('programacao', {titulo: 'Programação | WeComp'});
		}
	}else{
		response.render('teste', {titulo: 'WeComp'});
	}
});

router.get('/localizacao', function(request, response, next) {
    response.render('localizacao', {titulo: 'Localização | WeComp'});
});

router.get('/teste/:id', function(request, response, next) {
    console.log(request.params)
});
router.get('/sair', function(request, response, next) {
	logged = {};
	response.render('index', {titulo: 'WeComp'});
});




router.get('/postRegisterProgramming', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.registerProgramming(request.body, response)
});


module.exports = router;
