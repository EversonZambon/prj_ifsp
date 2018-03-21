var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');

registerDAO = function(){

    this.registerUser = function(register, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("Insert into person(email,name,password) Values(?,?,?)",[register.email,register.name,register.password],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
        })
        conection.end();
    };
}

module.exports = registerDAO;