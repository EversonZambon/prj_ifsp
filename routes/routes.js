var express = require('express');
var router = express.Router();
var app = express();
var userName = "";

//--- router.get ---//

router.get('/', function(request, response, next) {
    response.render('index-pattern', {titulo: 'WeComp'});
});

router.get('/login', function(request, response, next) {
    response.render('login', {titulo: 'Login | WeComp'});
});

router.get('/localizacao', function(request, response, next) {
    response.render('localization', {titulo: 'Localização | WeComp'});
});

router.get('/recuperarsenha', function(request, response, next) {
    response.render('recover-password', {titulo: 'Recuperar Senha | WeComp'});
});

router.get('/sair', function(request, response, next) {
	logged = {};
	response.render('index-pattern', {titulo: 'WeComp'});
});

router.get('/minhaconta', function(request, response, next) {
	if(logged.user){
		if(logged.user.profile == 0){
			userName = logged.user.name.split(" ");
			response.render('profile-user', {titulo: 'Minha Conta | WeComp', nome: userName[0], user: logged.user});
		}
	}else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/programacao', function(request, response, next) {
	if(logged.user){
		if(logged.user.profile == 0){
	 		userName = logged.user.name.split(" ");
			response.render('programming-admin', {titulo: 'Programação | WeComp', nome: userName[0]});
		}
	}else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/showEvents', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.showEvents(response)
});

router.get('/showDays', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var day = new programmingDAO()
	day.showDays(response)
});

//--- router.post ---//

router.post('/postLogin', function(request, response, next) {
    var loginDAO = require('../DAO/loginDAO');
	var user = new loginDAO();
	user.signIn(request.body, response);
});

router.post('/postRegisterUser', function(request, response, next) {
	var registerDAO = require('../DAO/registerDAO');
	var newUser = new registerDAO()
	newUser.registerUser(request.body, response)
});

router.post('/postRegisterDay/:newDay', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var day = new programmingDAO()
	day.registerDay(request.params.newDay, response)
});

router.post('/postRegisterEvent', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.registerEvent(request.body, response)
});

router.post('/postRecoverPassword/:email', function(request,response,next){
    var loginDAO = require('../DAO/loginDAO');
	var user = new loginDAO();
	user.recoverPassword(request.params.email, response);
});

module.exports = router;