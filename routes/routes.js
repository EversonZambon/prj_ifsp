var express = require('express');
var router = express.Router();

router.get('/', function(requisicao, resposta, next) {
    resposta.render('index', {titulo: 'WeComp'});
});

<<<<<<< HEAD
router.get('/login', function(requisicao, resposta, next) {
    resposta.render('login', {titulo: 'Login | WeComp'});
});

router.get('/programacao', function(requisicao, resposta, next) {
    resposta.render('programacao', {titulo: 'Programação | WeComp'});
});

=======
router.get('/index', function(request, response, next) {
    response.render('index', {titulo: 'WeComp'});
});

router.get('/login', function(request, response, next) {
    response.render('login', {titulo: 'WeComp - Login'});
});

router.post('/postLogin', function(request, response, next) {

	console.log("aqui");
});
>>>>>>> 84322bc6a59fa88a680c67177cb46d1c1d9df225

module.exports = router;
