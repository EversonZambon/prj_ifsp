var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');

loginDAO = function(){

    this.find = function(user, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select * from person where email=? and password=?",[user.email, user.password],function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(!result[0]){
                response.status(401).send({ error: 'Não autorizado' });
            }else{
                logged.user = result[0];
                response.send({result});
            }
            response.end();
        })
        conection.end();
    };
}

module.exports = loginDAO;