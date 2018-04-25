weComp.controller("session_controller_user_admin", ['$scope', '$cookieStore', '$window', '$interval', 'loginAPI',
	function ($scope, $cookieStore, $window, $interval, loginAPI){

		$scope.user = {};
		$scope.editUser = {};
		$scope.load = false;

		(function getInfo(){
	      $scope.currentUser = $cookieStore.get('user');
	      if($scope.currentUser){
	      	var name = $scope.currentUser.name.split(" ");
	      	$scope.userName = name[0];
	      	$scope.editUser.name = $scope.currentUser.name;
	  	  }
	    }());

		$scope.updateUser = function(user){
			if(user.password === user.passConfirm){
				$scope.load = true
				user.email = $scope.currentUser.email
				loginAPI.updateUser(user)
					.then(function(response){
						loginAPI.signIn(user)
							.then(function(response){
								$cookieStore.remove('user');
								$cookieStore.put('user', response.data);
								Materialize.toast('Dados atualizados!', 4000, 'green')
								$interval(function(){
									$window.location.reload();
								},700);
							})
					})
					.catch(function(err){
						Materialize.toast('Erro ao atualizar!', 4000, 'red')
					})
					.finally(function(){
						$scope.editUser = {}
						$scope.load = false
					})
			}else{
				Materialize.toast('Confira sua senha!', 4000, 'orange')
			}
		}

		$scope.logout = function(user){
			$cookieStore.remove('user');
			$cookieStore.remove('certificate')
		}

		$scope.openModalEditProfile = function(){
			$('#modalUpdateUser').modal('open');
		}
	},
])