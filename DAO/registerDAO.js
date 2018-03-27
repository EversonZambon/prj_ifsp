var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

registerDAO = function(){

    this.registerUser = function(register, response){
        var conection = mysql.createConnection(dbConfig);
        var password = bcrypt.hashSync(register.password, 10);
        conection.query("Insert into person(email,name,password) Values(?,?,?)",[register.email,register.name,password],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
        })
        conection.end();
    };
}

module.exports = registerDAO;