var express = require('express');
var router = express.Router();

router.get('/', function(requisicao, resposta, next) {
    resposta.render('index', {titulo: 'WeComp'});
});

router.get('/login', function(requisicao, resposta, next) {
    resposta.render('login', {titulo: 'Login | WeComp'});
});

router.get('/programacao', function(requisicao, resposta, next) {
    resposta.render('programacao', {titulo: 'Programação | WeComp'});
});

router.post('/postLogin', function(request, response, next) {

	console.log("Aqui");
});


module.exports = router;
