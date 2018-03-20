var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');

loginDAO = function(){

    this.register = function(user){
        var conection = mysql.createConnection(dbConfig);

        conection.query("Insert into test(email,pass) Values('"+user.email+"','"+user.password+"')")

        //console.log("BD",user)
        /*conection.query("Insert into Person(email,pass) Values('"+user.email+"','"+user.password+"')", function(error){
            if(!error)
                return true;
            else
                return false;
        })*/
        conection.end();
    };
}

module.exports = loginDAO;