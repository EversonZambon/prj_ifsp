webComp.controller("login_controller", ['$scope', 'loginAPI', 
	function ($scope, loginAPI){

		$scope.user = {}

		$scope.teste = function(user) {

			loginAPI.create(user)
				.then(function(response){
					console.log(response)
				})
				.catch(function(error){
					console.log(error)
				})
			//console.log("Testando!", user)
			//Materialize.toast('Testando toast!', 4000, 'green')
		}
	},
])