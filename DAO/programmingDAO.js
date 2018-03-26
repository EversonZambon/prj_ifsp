var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');

programmingDAO = function(){

    this.registerEvent = function(event, response){
        var conection = mysql.createConnection(dbConfig);
        console.log("DAO -> ",event)
        conection.query("insert into event() Values(?,?,?,?,?,?,?,?,?)",['2018/12/12',event.hourStart, event.hourFinish, event.vacancies, event.classroom, event.title, event.description, event.speaker, '10101'],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
        })
        conection.end();
    };

    this.showEvents= function(response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select * from event;",function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.send({result});
            response.end();
        })
        conection.end();
    };

    this.registerDay = function(day, response){
        console.log("DAO -> ",day)
        var conection = mysql.createConnection(dbConfig);
        conection.query("insert into day Values(?)",[day],function(err){
            if(err){
                response.status(500).send({ error: err.code });
                console.log("erro aqui",err)
            }
            response.end();
        })
        conection.end();
    };

    this.showDays= function(response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select * from day;",function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.send({result});
            response.end();
        })
        conection.end();
    };
}

module.exports = programmingDAO;