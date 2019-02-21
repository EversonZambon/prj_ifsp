weComp.controller("login_controller", ['$scope', '$cookieStore', '$window', '$interval', 'loginAPI',
	function ($scope, $cookieStore, $window, $interval, loginAPI){

		$scope.user = {};
		$scope.newUser = {};
		$scope.editUser = {};
		$scope.load = false;

		$scope.registerUser = function(newUser){
			if(CPF.validate(newUser.cpf)===true){
				if(newUser.password === newUser.passConfirm){
					$scope.load = true
					newUser.cpf = CPF.format(newUser.cpf)
					loginAPI.registerUser(newUser)
						.then(function(response){
							loginAPI.logIn(newUser)
								.then(function(response){
									$cookieStore.put('user', response.data);
									Materialize.toast('Cadastrado!', 4000, 'green')
									$interval(function(){
										$window.location.href = '/programacao';
									},700);
								})
						})
						.catch(function(err){
							if(err.data.error && err.data.error == '23505'){
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
			}else{
				Materialize.toast('CPF Inválido!', 4000, 'orange')
			}
		}

		$scope.logIn = function(user){
			$scope.load = true
			loginAPI.logIn(user)
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