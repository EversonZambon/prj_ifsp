var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');

loginDAO = function(){

    this.find = function(user, response){
        var conection = mysql.createConnection(dbConfig);

        conection.query("select * from person where email=? and password=?",[user.email, user.password],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
        })
        conection.end();
    };
}

module.exports = loginDAO;