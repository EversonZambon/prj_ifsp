var express = require('express');
var router = express.Router();

router.get('/', function(requisicao, resposta, next) {
    resposta.render('index', {titulo: 'WeComp'});
});

router.get('/index', function(request, response, next) {
    response.render('index', {titulo: 'WeComp'});
});

router.get('/login', function(request, response, next) {
    response.render('login', {titulo: 'WeComp - Login'});
});

router.post('/postLogin', function(request, response, next) {

	console.log("aqui");
});

module.exports = router;
