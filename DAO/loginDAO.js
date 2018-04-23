var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var rn = require('random-number');

loginDAO = function(){

    this.registerUser = function(user, response){
        var conection = mysql.createConnection(dbConfig);
        var password = bcrypt.hashSync(user.password, 10);
        conection.query("Insert into person(email,name,cpf,password) Values(?,?,?,?)",[user.email,user.name,user.cpf,password],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
        })
        conection.end();
    };

    this.updateUser = function(user, response){
        var conection = mysql.createConnection(dbConfig);
        var password = bcrypt.hashSync(user.password, 10);
        conection.query("update person set name=(?), password=(?) where email=(?)",[user.name,password,user.email],function(err){
            if(err){
                response.status(500).send({ error: err.code });
            }
            response.end();
        })
        conection.end();
    };

    this.signIn = function(user, response, request){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select * from person where email=?",[user.email],function(err,result){    
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(!result[0]){
                response.status(401).send({ error: 'Não autorizado' });
            }else{
                if(bcrypt.compareSync(user.password, result[0].password)==true){
                    
                    var currentUser = {};
                    currentUser.name = result[0].name;
                    currentUser.email = result[0].email;

                    var session = request.session
                    session.user = currentUser;
                    session.profile = result[0].profile;

                    response.send(currentUser);
                }else{
                    response.status(401).send({ error: 'Não autorizado' });
                }
            }
            response.end();
        })
        conection.end();
    };

    this.recoverPassword = function(email, response){
        var conection = mysql.createConnection(dbConfig);
        
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

        conection.query("update person set password=? where email=?",[password,email],function(err,result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(result.changedRows == 0){
                response.status(500).end();
            }else{
                transporter.sendMail(mailOptions);
                response.status(200).end();
            }
            response.end();
        });
    }
}

module.exports = loginDAO;