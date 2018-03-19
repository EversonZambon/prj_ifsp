angular.module("prj_ifsp").controller("login_controller", function ($scope) {

	$scope.teste = function() {
		console.log("Testando!")
		Materialize.toast('Testando toast!', 4000, 'green')
	}

});