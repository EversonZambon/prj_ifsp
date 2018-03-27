var express = require('express');
var router = express.Router();
var app = express();

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

router.get('/sair', function(request, response, next) {
	logged = {};
	response.render('index', {titulo: 'WeComp'});
});

router.get('/programacao', function(request, response, next) {
	if(logged.user){
		if(logged.user.profile == 0){
			response.render('programming-admin', {titulo: 'Programação | WeComp'});
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
	user.find(request.body, response, request);
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

module.exports = router;