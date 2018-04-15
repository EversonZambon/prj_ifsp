var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');

programmingDAO = function(){

    this.registerEvent = function(event, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("insert into event(day,hourStart,hourFinish,vacancies,classroom,title,description,speaker,photo) Values(?,?,?,?,?,?,?,?,?)",[event.day,event.hourStart, event.hourFinish, event.vacancies, event.classroom, event.title, event.description, event.speaker, event.photo],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
        })
        conection.end();
    };

    this.updateEvent = function(event, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("update event set hourStart=?,hourFinish=?,vacancies=?,classroom=?,title=?,description=?,speaker=?,photo=? where id=?",[event.hourStart, event.hourFinish, event.vacancies, event.classroom, event.title, event.description, event.speaker, event.photo, event.id],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
        })
        conection.end();
    };    

    this.registerDay = function(day, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("insert into day Values(?)",[day],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
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
            }else{
                response.send({result});
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
            }else{
                response.send({result});
            }
            response.end();
        })
        conection.end();
    };

    this.deleteDay = function(day, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("delete from day where day=(?)",[day],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
        })
        conection.end();
    };

    this.deleteEvent = function(id, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("delete from event where id=(?)",[id],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
        })
        conection.end();
    };
}

module.exports = programmingDAO;