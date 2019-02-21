var express = require('express');
var router = express.Router();
var app = express();

//--- router.get ---//

router.get('/', function(request, response, next){
	if(request.session.user){
		if(request.session.profile == 0){
			response.render('index-user', {titulo: 'WeComp'});
		}else if(request.session.profile == 1){
			response.render('index-admin', {titulo: 'WeComp'});
		}
	}else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/localizacao', function(request, response, next){
	if(request.session.user){
		if(request.session.profile == 0){
			response.render('localization-user', {titulo: 'Localização | WeComp'});
		}else if(request.session.profile == 1){
			response.render('localization-admin', {titulo: 'Localização | WeComp'});
		}
	}else{
		response.render('localization-pattern', {titulo: 'Localização | WeComp'});
	}
});

router.get('/programacao', function(request, response, next){
	if(request.session.user){
		if(request.session.profile == 0){
			response.render('programming-user', {titulo: 'Programação | WeComp'});
		}else if(request.session.profile == 1){
			response.render('programming-admin', {titulo: 'Programação | WeComp'});
		}
	}else{
		response.render('programming-pattern', {titulo: 'Programação | WeComp'});
	}
});

router.get('/minhaconta', function(request, response, next){
	if(request.session.user){
		if(request.session.profile == 0){
			response.render('profile-user', {titulo: 'Minha Conta | WeComp'});
		}else if(request.session.profile == 1){
			response.render('profile-admin', {titulo: 'Minha Conta | WeComp'});
		}
	}else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/certificados', function(request, response, next){
    if(request.session.user){
    	if(request.session.profile == 0){
    		response.render('certificates', {titulo: 'Certificados | WeComp'});
    	}else if(request.session.profile == 1){
			response.render('index-admin', {titulo: 'WeComp'});
		}
    }else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/certificado-visualizar', function(request, response, next){
	if(request.session.user){
		if(request.session.profile == 0){
    		response.render('certificates-view', {titulo: 'Certificados | WeComp'});
    	}else if(request.session.profile == 1){
    		response.render('index-admin', {titulo: 'WeComp'});
    	}
	}else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/sair', function(request, response, next){
	request.session.destroy(function(err) {
	  if(err) {
	    return next(err);
	  }else{
	    return response.render('index-pattern', {titulo: 'WeComp'});
	  }
	});
});

router.get('/login', function(request, response, next){
	if(request.session.user){
		if(request.session.profile == 0){
    		response.render('index-user', {titulo: 'WeComp'});
    	}else if(request.session.profile == 1){
    		response.render('index-admin', {titulo: 'WeComp'});
    	}
	}else{
		response.render('login', {titulo: 'Login | WeComp'});
	}
});

router.get('/recuperarsenha', function(request, response, next){
	if(request.session.user){
		if(request.session.profile == 0){
    		response.render('index-user', {titulo: 'WeComp'});
    	}else if(request.session.profile == 1){
    		response.render('index-admin', {titulo: 'WeComp'});
    	}
	}else{
		response.render('recover-password', {titulo: 'Recuperar Senha | WeComp'});
	}
});

router.get('/apoio', function(request, response, next){
	if(request.session.user){
		if(request.session.profile == 0){
    		response.render('index-user', {titulo: 'WeComp'});
    	}else if(request.session.profile == 1){
    		response.render('support-admin', {titulo: 'Apoio | WeComp'});
    	}
	}else{
		response.render('index-pattern', {titulo: 'WeComp'});
	}
});

router.get('/showEvents', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.showEvents(response)
});

router.get('/showDays', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var day = new programmingDAO()
	day.showDays(response)
});

router.get('/showSupports', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var support = new programmingDAO()
	support.showSupports(response)
});

router.get('/getEventsOnDays', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var day = new programmingDAO()
	day.getEventsOnDays(response)
});

router.get('/getSubscriberInfo/:email', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var user = new programmingDAO()
	user.getSubscriberInfo(response.req.params.email, response)
});

router.get('/getSubscriberByIdEvent/:idEvent', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.getSubscriberByIdEvent(response.req.params.idEvent, response)
});

router.get('/getCertificates/:email', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var certificate = new programmingDAO()
	certificate.getCertificates(response.req.params.email, response)
});

//--- router.post ---//

router.post('/postLogin', function(request, response, next){
    var loginDAO = require('../DAO/loginDAO');
	var user = new loginDAO();
	user.logIn(request.body, response, request);
});

router.post('/postRegisterUser', function(request, response, next){
	var loginDAO = require('../DAO/loginDAO');
	var newUser = new loginDAO();
	newUser.registerUser(request.body, response)
});

router.post('/postUpdateUser', function(request, response, next){
	var loginDAO = require('../DAO/loginDAO');
	var user = new loginDAO();
	user.updateUser(request.body, response)
});

router.post('/postRegisterDay/:newDay', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var day = new programmingDAO()
	day.registerDay(request.params.newDay, response)
});

router.post('/postRegisterSupport', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var support = new programmingDAO()
	support.registerSupport(request.body, response)
});

router.post('/postDeleteDay/:day', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var day = new programmingDAO()
	day.deleteDay(request.params.day, response)
});

router.post('/postDeleteEvent/:id', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.deleteEvent(request.params.id, response)
});

router.post('/postDeleteSupport/:id', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var support = new programmingDAO()
	support.deleteSupport(request.params.id, response)
});

router.post('/postRegisterEvent', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.registerEvent(request.body, response)
});

router.post('/postUpdateEvent', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.updateEvent(request.body, response)
});

router.post('/postRecoverPassword/:email', function(request,response,next){
    var loginDAO = require('../DAO/loginDAO');
	var user = new loginDAO();
	user.recoverPassword(request.params.email, response);
});

router.post('/postAddSubscription/:eventID,:email', function(request,response,next){
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.addSubscription(request.params, response)
});

router.post('/postRemoveSubscription/:eventID,:email', function(request,response,next){
    var programmingDAO = require('../DAO/programmingDAO');
	var event = new programmingDAO()
	event.removeSubscription(request.params, response)
});

router.post('/updatePresence', function(request, response, next){
    var programmingDAO = require('../DAO/programmingDAO');
	var subscriber = new programmingDAO()
	subscriber.updatePresence(request.body, response)
});

module.exports = router;