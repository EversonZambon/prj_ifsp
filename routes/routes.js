var express = require('express');
var router = express.Router();

router.get('/', function(requisicao, resposta, next) {
    resposta.render('index', {titulo: 'WeComp'});
});

module.exports = router;
