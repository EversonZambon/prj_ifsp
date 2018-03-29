var dbConfig = require('../dataBaseConfig');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var rn = require('random-number');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wecompif@gmail.com',
    pass: 'wecompadmin'
  }
});

loginDAO = function(){

    this.signIn = function(user, response){
        var conection = mysql.createConnection(dbConfig);
        conection.query("select * from person where email=?",[user.email],function(err,result){    
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(!result[0]){
                response.status(401).send({ error: 'Não autorizado' });
            }else{
                if(bcrypt.compareSync(user.password, result[0].password)==true){
                    logged.user = result[0];
                    response.send({result});
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
        conection.query("select email from person where email=?",[email], function(err, result){
            if(err){
                response.status(500).send({ error: err.code });
            }
            if(!result[0]){
                response.status(401).send({ error: 'Não autorizado' });
            }else{
                var gen = rn.generator({
                  min:  10000, 
                  max:  100000, 
                  integer: true
                });

                var cod = gen(1550);

                var mailOptions = {
                  from: 'wecompif@gmail.com',
                  to: email,
                  subject: 'Recuperação de senha | WeComp',
                  text: 'Uma nova senha foi gerada! Use-a para recuperar sua senha! ' + 'Senha:' + cod
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    response.status(500).send({ error: err.code });
                  }else{
                    var password = bcrypt.hashSync(cod, 10);
                    conection.query("update person set password=? where email=?",[password,email],function(err,result){
                        if(err){
                            response.status(500).send({ error: err.code });
                        }else{
                            response.status(202).end();
                        }
                    });
                  }
                });
            }
            response.end();
        })
        conection.end();
    }
}

module.exports = loginDAO;