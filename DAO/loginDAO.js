var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

loginDAO = function(){

    this.find = function(user, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select * from person where email=?",[user.email],function(err,result){    
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(!result[0]){
                response.status(401).send({ error: 'Não autorizado' });
            }else{
                if(bcrypt.compareSync(user.password, result[0].password)==true){
                    logged.user = result[0];
                    response.send({result});
                }else{
                    response.status(401).send({ error: 'Não autorizado' });
                }
            }
            response.end();
        })
        conection.end();
    };
}

module.exports = loginDAO;