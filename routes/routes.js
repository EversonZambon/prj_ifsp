var express = require('express');
var router = express.Router();
var app = express();
var userName = "";

//--- router.get ---//

router.get('/', function(request, response, next) {
	if(session.user){
		if(session.user.profile == 0){
	 		userName = session.user.name.split(" ");
			response.render('index-user', {titulo: 'WeComp', nome: userName[0]});
		}else if(session.user.profile == 1){
			userName = session.user.name.split(" ");
			response.render('index-admin', {titulo: 'WeComp', nome: userName[0]});
		}
	}else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/localizacao', function(request, response, next) {
	if(session.user){
		if(session.user.profile == 0){
	 		userName = session.user.name.split(" ");
			response.render('localization-user', {titulo: 'Localizaçã | WeComp', nome: userName[0]});
		}else if(session.user.profile == 1){
			userName = session.user.name.split(" ");
			response.render('localization-admin', {titulo: 'Localizaçã | WeComp', nome: userName[0]});
		}
	}else{
		response.render('localization-pattern', {titulo: 'Localização | WeComp'});
	}
});

router.get('/minhaconta', function(request, response, next) {
	if(session.user){
		if(session.user.profile == 0){
			userName = session.user.name.split(" ");
			response.render('profile-user', {titulo: 'Minha Conta | WeComp', nome: userName[0]});
		}
	}else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/programacao', function(request, response, next) {
	if(session.user){
		if(session.user.profile == 0){
	 		userName = session.user.name.split(" ");
			response.render('programming-user', {titulo: 'Programação | WeComp', nome: userName[0]});
		}else if(session.user.profile == 1){
			userName = session.user.name.split(" ");
			response.render('programming-admin', {titulo: 'Programação | WeComp', nome: userName[0]});
		}
	}else{
		response.render('programming-pattern', {titulo: 'WeComp'});
	}
});

router.get('/login', function(request, response, next) {
    response.render('login', {titulo: 'Login | WeComp'});
});

router.get('/recuperarsenha', function(request, response, next) {
    response.render('recover-password', {titulo: 'Recuperar Senha | WeComp'});
});

router.get('/sair', function(request, response, next) {
	delete session.user;
	response.render('index-pattern', {titulo: 'WeComp'});
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

router.get('/getSubscriberInfo/:email', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var user = new programmingDAO()
	user.getSubscriberInfo(response.req.params.email, response)
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

router.post('/postDeleteDay/:day', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var day = new programmingDAO()
	day.deleteDay(request.params.day, response)
});

router.post('/postDeleteEvent/:id', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.deleteEvent(request.params.id, response)
});

router.post('/postRegisterEvent', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.registerEvent(request.body, response)
});

router.post('/postUpdateEvent', function(request, response, next) {
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.updateEvent(request.body, response)
});

router.post('/postRecoverPassword/:email', function(request,response,next){
    var loginDAO = require('../DAO/loginDAO');
	var user = new loginDAO();
	user.recoverPassword(request.params.email, response);
});

router.post('/postRegisterInEvent/:eventID,:email', function(request,response,next){
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.registerInEvent(request.params, response)
});

module.exports = router;