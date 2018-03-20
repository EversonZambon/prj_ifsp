var express = require('express');
var router = express.Router();

var loginDAO = require('../DAO/LoginDAO');

router.get('/', function(request, response, next) {
    response.render('index', {titulo: 'WeComp'});
});

router.get('/login', function(request, response, next) {
    response.render('login', {titulo: 'Login | WeComp'});
});

router.get('/programacao', function(request, response, next) {
    response.render('programacao', {titulo: 'Programação | WeComp'});
});

router.post('/postLogin', function(request, response, next) {
	
	var user = request.body
	//console.log("Aqui")

	var loginInsert = new loginDAO()
	loginInsert.register(user)

	//console.log(status)
});


module.exports = router;
