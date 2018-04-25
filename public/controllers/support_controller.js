weComp.controller("support_controller", ['$scope', '$window', '$interval', 'supportAPI', '$filter',
	function ($scope, $window, $interval, supportAPI, $filter){

		$scope.load = false
		$scope.newSupport = {};
		$scope.supports = {};

     	(function showSupports(){
        $scope.load = true
        supportAPI.showSupports()
          .then(function (response){
          	$scope.supports = response.data.result
          })
          .catch(function (err){
            Materialize.toast('Erro ao carregar os apoios!', 4000, "red")
          })
          .finally(function (){
            $scope.load = false
          })
     	}());

     	$(document).ready(function (){
	        $('#support-photo').change(function (){
	            if (this.files.length > 0){
	                $.each(this.files, function (index, value){
	                	switch(value.type){
	                		case "image/png": break;
	                		case "image/jpeg": break;
	                		case "image/jpg": break;
	                		default:{
	                			Materialize.toast('Apenas arquivos de imagem!', 6000, 'red')
	                			$('#support-photo').val('')
	                			return 0;
	                		}
	                	}
	                	if(value.size > 1000000){
	                		Materialize.toast('Foto até 900 KB!', 6000, 'red')
	                		$('#support-photo').val('')
	                	}
	                })
	            }
	        });
	    });

		$scope.createSupport = function(newSupport){
			$scope.load = true
			if(newSupport.site){
				newSupport.site = 'http://' + newSupport.site
			}
			var file = new FileReader();
			file.readAsDataURL($('#support-photo')[0].files[0]);
			file.onloadend = function () {
		    	newSupport.photo = file.result
		    	$scope.createSupportDB(newSupport)
		  	}
		}

		$scope.createSupportDB = function(newSupport){
			supportAPI.createSupport(newSupport)
				.then(function(response){
					Materialize.toast('Apoio cadastrado!', 4000, 'green')
					$interval(function(){
						$window.location.reload();
					},700)
				})
				.catch(function(err){
					Materialize.toast('Erro ao cadastrar!', 4000, 'red')
				})
				.finally(function(){
					$scope.load = false
				})
		}

		$scope.deleteSupport = function(id){
			$scope.load = true
			supportAPI.deleteSupport(id)
				.then(function(response){
					Materialize.toast('Apoio excluído!', 4000, 'green')
					$interval(function(){
						$window.location.reload();
					},700)
				})
				.catch(function(err){
					Materialize.toast('Erro ao excluir!', 4000, 'red')
				})
				.finally(function(){
					$scope.load = false
				})
		}

		$scope.openModalSupport = function(){
			$('#modalRegisterSupport').modal('open')
		}
	},
])