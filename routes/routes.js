var express = require('express');
var router = express.Router();

router.get('/', function(requisicao, resposta, next) {
    resposta.render('login', {titulo: 'Login'});
});

module.exports = router;
