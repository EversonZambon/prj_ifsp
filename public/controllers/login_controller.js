weComp.controller("login_controller", ['$scope', '$cookies', '$cookieStore', '$window', '$interval', 'loginAPI',
	function ($scope, $cookies, $cookieStore, $window, $interval, loginAPI){

		$scope.user = {};
		$scope.newUser = {};
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

		$scope.registerUser = function(newUser){
			if(CPF.validate(newUser.cpf)===true){
				if(newUser.password === newUser.passConfirm){
					$scope.load = true
					newUser.cpf = CPF.format(newUser.cpf)
					loginAPI.registerUser(newUser)
						.then(function(response){
							loginAPI.signIn(newUser)
								.then(function(response){
									$cookieStore.put('user', response.data);
									Materialize.toast('Cadastrado!', 4000, 'green')
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
			}else{
				Materialize.toast('CPF Inválido!', 4000, 'red')
			}
		}

		$scope.signIn = function(user){
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

		$scope.logout = function(user){
			$cookieStore.remove('user');
			$cookieStore.remove('certificate')
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

		$scope.openModalEditProfile = function(){
			$('#modalUpdateUser').modal('open');
		}
	},
])