webComp.controller("login_controller", ['$scope', 'registerAPI', 
	function ($scope, registerAPI){

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
	},
])