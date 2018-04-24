var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');
var hmh = require('hmh');

programmingDAO = function(){

    calcWorkload = function(eventHourStart, eventHourFinish){
        var hourStart = eventHourStart.split(':').join('h ') + "m"
        var hourFinish = eventHourFinish.split(':').join('h ') + "m"
        var workload = hmh.diff(hourStart,hourFinish)
        if(workload.m == null){
            workload.m = "00"
        }
        if(workload.h == null){
            workload.h = "00"
        }
        workload = workload.h + "h" + workload.m
        return workload
    }

    this.registerEvent = function(event, response){
        var conection = mysql.createConnection(dbConfig);
        var workload = calcWorkload(event.hourStart, event.hourFinish);
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
        var workload = calcWorkload(event.hourStart, event.hourFinish);
        conection.query("update event set hourStart=?,hourFinish=?,workload=?,vacancies=?,classroom=?,title=?,description=?,speaker=?,photo=? where id=?",[event.hourStart, event.hourFinish, workload, event.vacancies, event.classroom, event.title, event.description, event.speaker, event.photo, event.id],function(err){
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

    this.registerSupport = function(support, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("insert into support(site, photo) Values(?,?)",[support.site, support.photo],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
        })
        conection.end();
    };

    this.addSubscription = function(info, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("insert into subscription(idEvent,email) Values(?,?)",[info.eventID,info.email],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                var conection2 = mysql.createConnection(dbConfig);
                conection2.query("update event set vacanciesRemaining=vacanciesRemaining+1 where id=(?)",[info.eventID])
                conection2.end();
                response.status(200).end();
            }
            response.end();
        })
        conection.end();
    };
    
    this.removeSubscription = function(info, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("delete from subscription where email=(?) and idEvent=(?)",[info.email,info.eventID],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                var conection2 = mysql.createConnection(dbConfig);
                conection2.query("update event set vacanciesRemaining=vacanciesRemaining-1 where id=(?)",[info.eventID])
                conection2.end();
                response.status(200).end();
            }
            response.end();
        })
        conection.end();
    };

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

    this.showSupports = function(response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select * from support;",function(err, result){
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
        conection.query("select s.idEvent from (event e left join subscription s on e.id = s.idEvent and s.email =(?)) order by e.id",[email],function(err, result){
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

    this.getSubscriberByIdEvent = function(idEvent, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select s.idEvent, p.name, p.cpf, s.email, s.presence from subscription s, person p where s.email=p.email and s.idEvent=(?) order by p.name",[idEvent],function(err, result){
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

    this.getCertificates = function(email, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select p.name, p.cpf, e.id, e.day, e.workload, e.title from ((subscription s join event e on s.idEvent = e.id) join person p on p.email = s.email) where s.presence=1 and s.email=(?)",[email],function(err, result){
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

    this.getEventsOnDays = function(response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select d.day, e.id from (day d  left join event e on d.day = e.day) order by d.day;",function(err, result){
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

    this.updatePresence = function(selecteds, response){
        var conection = mysql.createConnection(dbConfig);
        for(var i in selecteds){
            conection.query("update subscription set presence=1 where email=(?) and idEvent=(?)",[selecteds[i].email,selecteds[i].idEvent],function(err){
                if(err){
                    response.status(500).send({ error: err.code });
                }
            })
        }
        response.end();
        conection.end();
    };
}

module.exports = programmingDAO;