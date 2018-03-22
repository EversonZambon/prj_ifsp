var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');

programmingDAO = function(){

    this.registerProgramming = function(event, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("insert into event() Values(?,?,?)",[event],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
        })
        conection.end();
    };
}

module.exports = programmingDAO;