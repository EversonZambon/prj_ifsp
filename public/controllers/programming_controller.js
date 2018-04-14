weComp.controller("programming_controller", ['$scope', '$window', '$interval', 'programmingAPI', 'loginAPI', '$filter',
	function ($scope, $window, $interval, programmingAPI, loginAPI, $filter){

		$scope.load = false
		$scope.events = {};
		$scope.days = {};
		$scope.newEvent = {};

		(function showEvents() {
        $scope.load = true
        programmingAPI.showEvents()
                  .then(function (response) {
                  	$scope.events = response.data.result
                  	for(var i in $scope.events){
	                   $scope.events[i].day = $filter('date')($scope.events[i].day,'dd/MM/yyyy')
	                   var hourStart = $scope.events[i].hourStart.split(':')
	                   $scope.events[i].hourStart = hourStart[0] + ":" + hourStart[1]
	                   var hourFinish = $scope.events[i].hourFinish.split(':')
	                   $scope.events[i].hourFinish = hourFinish[0] + ":" + hourFinish[1]
                  	}
                  })
                  .catch(function (err) {
                    Materialize.toast('Erro ao carregar os eventos!', 4000, "red")
                  })
                  .finally(function () {
                    $scope.load = false
                  })
     	}());

     	(function showDays() {
        $scope.load = true
        programmingAPI.showDays()
                  .then(function (response) {
                  	$scope.days = response.data.result
                  	for(var i in $scope.days){
	                   $scope.days[i].day = $filter('date')($scope.days[i].day,'dd/MM/yyyy')
                  	}
                  })
                  .catch(function (err) {
                    Materialize.toast('Erro ao carregar os dias!', 4000, "red")
                  })
                  .finally(function () {
                    $scope.load = false
                  })
     	}());

     	$(document).ready(function () {
	        $('#speaker-photo').change(function () {
	            if (this.files.length > 0) {
	                $.each(this.files, function (index, value) {
	                	if(value.size > 1000000){
	                		Materialize.toast('Foto até 900 KB!', 6000, 'red')
	                		$('#speaker-photo').val('')
	                	}
	                	switch(value.type){
	                		case "image/png": break;
	                		case "image/jpeg": break;
	                		case "image/jpg": break;
	                		default:{
	                			Materialize.toast('Apenas arquivos de imagem!', 6000, 'red')
	                			$('#speaker-photo').val('')
	                			break;
	                		}
	                	}
	                })
	            }
	        });
	    });

     	$scope.registerDay = function(newDay) {
			$scope.load = true
			newDay = $('#day').pickadate('picker').get('highlight', 'yyyy-mm-dd');
			programmingAPI.createDay(newDay)
				.then(function(response){
					Materialize.toast('Dia cadastrado!', 4000, 'green')
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

		$scope.deleteDay = function(day) {
			$scope.load = true
			day = day.split('/').reverse().join('-')
			programmingAPI.deleteDay(day)
				.then(function(response){
					Materialize.toast('Dia excluído!', 4000, 'green')
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

     	$scope.registerEvent = function(newEvent) {
			$scope.load = true
			newEvent.classroom = $('#class-room').val();
			newEvent.hourStart = $('#hour-start').val();
			newEvent.hourFinish = $('#hour-finish').val();
			
			if($('#speaker-photo')[0].files[0]){
				var file = new FileReader();
				file.readAsDataURL($('#speaker-photo')[0].files[0]);
				file.onloadend = function () {
		    		newEvent.photo = file.result
		    		$scope.createEvent(newEvent)
		  		}
			}else{
				newEvent.photo = "";
				$scope.createEvent(newEvent)
			}
		}

		$scope.createEvent = function(newEvent){
			programmingAPI.createEvent(newEvent)
				.then(function(response){
					Materialize.toast('Evento cadastrado!', 4000, 'green')
					$interval(function(){
						$window.location.reload();
					},700)
				})
				.catch(function(err){
					console.log("erro",err)
					Materialize.toast('Erro ao cadastrar!', 4000, 'red')
				})
				.finally(function(){
					$scope.load = false
				})
		}

		$scope.openModalEvent = function(day) {
			$scope.newEvent.day = day
			$scope.newEvent.day = $scope.newEvent.day.split('/').reverse().join('-')
			$('#modalRegisterEvent').modal('open')
		}

		$scope.openModalEditEvent = function(event){
			$scope.editEvent = event
			$('#edit-class-room').val($scope.editEvent.classroom)
			$('#edit-class-room').material_select()
			$("#div-edit-event").parent().find("label").addClass("active")
			$('#modalEditEvent').modal('open')
		}

		$scope.openModalDay = function() {
			$('#modalRegisterDay').modal('open')
		}

		$scope.confirmDeleteDay = function(day) {
			$scope.removeDay = day;
			$('#modalDeleteDay').modal('open')
		}
	},
])