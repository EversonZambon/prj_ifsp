var dbConfig = require('../DataBaseConfig');
var hmh = require('hmh');
var { Pool } = require('pg');

programmingDAO = function(){

    calcWorkload = function(eventHourstart, eventHourfinish){
        var hourstart = eventHourstart.split(':').join('h ') + "m"
        var hourfinish = eventHourfinish.split(':').join('h ') + "m"
        var workload = hmh.diff(hourstart,hourfinish)
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
        let pool = new Pool(dbConfig);
        var workload = calcWorkload(event.hourstart, event.hourfinish);
        pool.query("insert into event(day,hourstart,hourfinish,workload,vacancies,classroom,title,description,speaker,photo) Values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",[event.day, event.hourstart, event.hourfinish, workload, event.vacancies, event.classroom, event.title, event.description, event.speaker, event.photo],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };

    this.updateEvent = function(event, response){
        let pool = new Pool(dbConfig);
        var workload = calcWorkload(event.hourstart, event.hourfinish);
        pool.query("update event set hourstart=$1,hourfinish=$2,workload=$3,vacancies=$4,classroom=$5,title=$6,description=$7,speaker=$8,photo=$9 where id=$10",[event.hourstart, event.hourfinish, workload, event.vacancies, event.classroom, event.title, event.description, event.speaker, event.photo, event.id],function(err){
            if(err){
                response.status(500).send({ error: err.code })
            }else{
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };    

    this.registerDay = function(day, response){
        let pool = new Pool(dbConfig);
        pool.query("insert into day Values($1)",[day],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };

    this.registerSupport = function(support, response){
        let pool = new Pool(dbConfig);
        pool.query("insert into support(site, photo) Values($1,$2)",[support.site, support.photo],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };

    this.addSubscription = function(info, response){
        let pool = new Pool(dbConfig);
        pool.query("insert into subscription(idEvent,email) Values($1,$2)",[info.eventID,info.email],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                let pool2 = new Pool(dbConfig);
                pool2.query("update event set vacanciesRemaining=vacanciesRemaining+1 where id=($1)",[info.eventID])
                pool2.end();
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };
    
    this.removeSubscription = function(info, response){
        let pool = new Pool(dbConfig);
        pool.query("delete from subscription where email=($1) and idEvent=($2)",[info.email,info.eventID],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                let pool2 = new Pool(dbConfig);
                pool2.query("update event set vacanciesRemaining=vacanciesRemaining-1 where id=($1)",[info.eventID])
                pool2.end();
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };

    this.showDays = function(response){
        let pool = new Pool(dbConfig);
        pool.query("select * from day;",function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.send(result.rows);
            }
            response.end();
            pool.end();
        })
    };

    this.showSupports = function(response){
        let pool = new Pool(dbConfig);
        pool.query("select * from support;",function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.send(result.rows);
            }
            response.end();
            pool.end();
        })
    };

    this.showEvents = function(response){
        let pool = new Pool(dbConfig);
        pool.query("select * from event;",function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.send(result.rows);
            }
            response.end();
            pool.end();
        })
    };

    this.getSubscriberInfo = function(email, response){
        let pool = new Pool(dbConfig);
        pool.query("select s.idEvent from (event e left join subscription s on e.id = s.idEvent and s.email =($1)) order by e.id",[email],function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(result){
                response.send(result.rows);
            }
            response.end();
            pool.end();
        })
    };

    this.getSubscriberByIdEvent = function(idEvent, response){
        let pool = new Pool(dbConfig);
        pool.query("select s.idEvent, p.name, p.cpf, s.email, s.presence from subscription s, person p where s.email=p.email and s.idEvent=($1) order by p.name",[idEvent],function(err, result){
           if(err){
                response.status(500).send({ error: err.code });
            }
            if(result){
                response.send(result.rows);
            }
            response.end();
            pool.end();
        })
    };

    this.getCertificates = function(email, response){
        let pool = new Pool(dbConfig);
        pool.query("select p.name, p.cpf, e.id, e.day, e.workload, e.title from ((subscription s join event e on s.idEvent = e.id) join person p on p.email = s.email) where s.presence=1 and s.email=($1)",[email],function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(result){
                response.send(result.rows);
            }
            response.end();
            pool.end();
        })
    };

    this.getEventsOnDays = function(response){
        let pool = new Pool(dbConfig);
        pool.query("select d.day, e.id from (day d  left join event e on d.day = e.day) order by d.day;",function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(result){
                response.send(result.rows);
            }
            response.end();
            pool.end();
        })
    };    

    this.deleteDay = function(day, response){
        let pool = new Pool(dbConfig);
        pool.query("delete from day where day=($1)",[day],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };

    this.deleteEvent = function(id, response){
        let pool = new Pool(dbConfig);
        pool.query("delete from event where id=($1)",[id],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };

    this.deleteSupport = function(id, response){
        let pool = new Pool(dbConfig);
        pool.query("delete from support where id=($1)",[id],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }else{
                response.status(200).end();
            }
            response.end();
            pool.end();
        })
    };

    this.updatePresence = function(selecteds, response){
        let pool = new Pool(dbConfig);
        for(var i in selecteds){
            pool.query("update subscription set presence=1 where email=($1) and idevent=($2)",[selecteds[i].email,selecteds[i].idevent],function(err){
                if(err){
                    response.status(500).send({ error: err.code });
                }
            })
        }
        response.end();
        pool.end();
    };
}

module.exports = programmingDAO;