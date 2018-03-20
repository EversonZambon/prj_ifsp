var express = require('express');
var router = express.Router();

var loginDAO = require('../DAO/LoginDAO');

router.get('/', function(requisicao, resposta, next) {
    resposta.render('index', {titulo: 'WeComp'});
});

router.get('/login', function(requisicao, resposta, next) {
    resposta.render('login', {titulo: 'Login | WeComp'});
});

router.get('/programacao', function(requisicao, resposta, next) {
    resposta.render('programacao', {titulo: 'Programação | WeComp'});
});

router.get('/localizacao', function(requisicao, resposta, next) {
    resposta.render('localizacao', {titulo: 'Localização | WeComp'});
});

router.post('/postLogin', function(request, response, next) {
	
	var user = request.body
	//console.log("Aqui")

	var loginInsert = new loginDAO()
	loginInsert.register(user)

	//console.log(status)
});

module.exports = router;
