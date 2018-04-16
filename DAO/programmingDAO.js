var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');
var hmh = require('hmh');

programmingDAO = function(){

    this.registerEvent = function(event, response){
        var conection = mysql.createConnection(dbConfig);
        var hourStart = event.hourStart.split(':').join('h ') + "m"
        var hourFinish = event.hourFinish.split(':').join('h ') + "m"
        var workload = hmh.diff(hourStart,hourFinish)
        if(workload.m == null){
            workload.m = "00"
        }
        if(workload.h == null){
            workload.h = "00"
        }
        workload = workload.h + "h" + workload.m
        conection.query("insert into event(day,hourStart,hourFinish,workload,vacancies,classroom,title,description,speaker,photo) Values(?,?,?,?,?,?,?,?,?,?)",[event.day, event.hourStart, event.hourFinish, workload, event.vacancies, event.classroom, event.title, event.description, event.speaker, event.photo],function(err){
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

    this.registerInEvent = function(info, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("insert into subscription(idEvent,email) Values(?,?)",[info.eventID,info.email],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
        })
        conection.end();
    }
    
    this.showDays = function(response){
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

    this.showEvents = function(response){
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

    this.getSubscriberInfo = function(email, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select * from subscription where email=(?)",[email],function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(result[0]){
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