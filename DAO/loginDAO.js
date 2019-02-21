var dbConfig = require('../DataBaseConfig');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var rn = require('random-number');
var { Pool } = require('pg');

loginDAO = function(){

    this.registerUser = function(user, response){
        let pool = new Pool(dbConfig);
        var password = bcrypt.hashSync(user.password, 10);
        pool.query("Insert into person(email,name,cpf,password) Values($1,$2,$3,$4)",[user.email,user.name,user.cpf,password],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
            pool.end();
        })
    };

    this.updateUser = function(user, response){
        let pool = new Pool(dbConfig);
        var password = bcrypt.hashSync(user.password, 10);
        pool.query('update person set name=($1), password=($2) where email=($3)',[user.name,password,user.email],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
            pool.end();
        })
    };

    this.logIn = function(user, response, request){
        let pool = new Pool(dbConfig);
        pool.query('select * from person where email=$1',[user.email],function(err,result){ 
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(!result){
                response.status(401).send({ error: 'Não autorizado' });
            }else{
                if(bcrypt.compareSync(user.password, result.rows[0].password)==true){
                    
                    var currentUser = {};
                    currentUser.name = result.rows[0].name;
                    currentUser.email = result.rows[0].email;

                    var session = request.session
                    session.user = currentUser;
                    session.profile = result.rows[0].profile;

                    response.send(currentUser);
                }else{
                    response.status(401).send({ error: 'Não autorizado' });
                }
            }
            response.end();
            pool.end();
        })
    };

    this.recoverPassword = function(email, response){
        let pool = new Pool(dbConfig);
        
        var gen = rn.generator({
                  min:  10000, 
                  max:  100000, 
                  integer: true
        });

        var cod = gen(1550);

        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'wecompif@gmail.com',
            pass: 'wecompadmin'
          }
        });

        var mailOptions = {
          from: 'wecompif@gmail.com',
          to: email,
          subject: 'Recuperação de senha | WeComp',
          text: 'Uma nova senha foi gerada! Use-a para recuperar sua senha! ' + 'Senha: ' + cod
        };

        var password = bcrypt.hashSync(cod.toString(), 10);

        transporter.sendMail(mailOptions,function(err,info){
            if(err){
                console.log('err',err)
                response.status(500).send({ error: err.code });
            }else{
                pool.query("update person set password=$1 where email=$2",[password,email],function(err,result){
                    if(err){
                        console.log('err',err)
                        response.status(500).send({ error: err.code });
                    }
                    if(result.rowCount == 0){
                        response.status(500).end();
                    }else{
                        console.log('codigo',cod);
                        response.status(200).end();
                    }
                    response.end();
                    pool.end();
                });
            }
        });
    }
}

module.exports = loginDAO;