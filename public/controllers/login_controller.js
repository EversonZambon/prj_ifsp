weComp.controller("login_controller", ['$scope', '$window', '$interval', 'registerAPI', 'loginAPI',
	function ($scope, $window, $interval, registerAPI, loginAPI){

		$scope.user = {}
		$scope.newUser = {}
		$scope.load = false

		$scope.register = function(newUser) {
			if(newUser.password === newUser.passConfirm){
				$scope.load = true
				registerAPI.create(newUser)
					.then(function(response){
						Materialize.toast('Cadastrado!', 4000, 'green')
					})
					.catch(function(err){
						var msg = err.data.error
						if(msg === "ER_DUP_ENTRY"){
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

		$scope.find = function(user) {
			$scope.load = true
			loginAPI.find(user)
				.then(function(response){
					Materialize.toast('Bem vindo!', 4000, 'green')
					console.log(response)
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

		$scope.teste = function() {
			var number = 1
			loginAPI.test(number)
				.then(function(response){
					console.log("response",response)
				})
				.catch(function(err){
					console.log("err",err)
				})
				.finally(function(){
					$scope.user = {}
					$scope.load = false
				})
			
		}
	},
])