weComp.controller("login_controller", ['$scope', '$cookies', '$cookieStore', '$window', '$interval', 'registerAPI', 'loginAPI',
	function ($scope, $cookies, $cookieStore, $window, $interval, registerAPI, loginAPI){

		$scope.user = {};
		$scope.newUser = {};
		$scope.load = false;

		(function getInfo() {
	      $scope.currentUser = $cookieStore.get('user');
	    }());

		$scope.register = function(newUser) {
			if(newUser.password === newUser.passConfirm){
				$scope.load = true
				registerAPI.create(newUser)
					.then(function(response){
						Materialize.toast('Cadastrado!', 4000, 'green')
						loginAPI.signIn(newUser)
							.then(function(){
								$interval(function(){
									$window.location.href = '/programacao';
								},700);
							})
					})
					.catch(function(err){
						if(err.data.error === "ER_DUP_ENTRY"){
							Materialize.toast('E-mail já cadastrado!', 4000, 'red')
						}else{
							Materialize.toast('Erro ao cadastrar!', 4000, 'red')
						}
					})
					.finally(function(){
						$scope.newUser = {}
						$scope.load = false
					})
			}else{
				Materialize.toast('Confira sua senha!', 4000, 'orange')
			}
		}

		$scope.signIn = function(user) {
			$scope.load = true
			loginAPI.signIn(user)
				.then(function(response){
					$cookieStore.put('user', response.data);
					Materialize.toast('Bem vindo!', 4000, 'green')
					$interval(function(){
						$window.location.href = '/programacao';
					},700);
				})
				.catch(function(err){
					Materialize.toast('Dados incorretos', 4000, 'red')
				})
				.finally(function(){
					$scope.user = {}
					$scope.load = false
				})
			
		}

		$scope.recoverPassword = function(email){
			console.log(email.toString())
			$scope.load = true
			loginAPI.passwordRecover(email)
				.then(function(response){
					Materialize.toast('Código enviado!', 4000, 'green')
					$interval(function(){
						$window.location.href = '/login';
					},700);
					
				})
				.catch(function(err){
					Materialize.toast('E-mail não cadastrado!', 4000, 'red')
				})
				.finally(function(){
					$scope.load = false
				})
		}
	},
])