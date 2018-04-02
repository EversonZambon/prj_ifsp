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
	                   $scope.events[i].hourStart = $filter('date')($scope.events[i].hourStart,'hhmm')
	                   $scope.events[i].hourFinish = $filter('date')($scope.events[i].hourFinish,'hhmm') 
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


     	$scope.registerEvent = function(newEvent) {
			$scope.load = true

			newEvent.hourStart = $('#hour-start').pickatime('picker').get();

			console.log(newEvent.hourStart)
			/*programmingAPI.createEvent(newEvent)
				.then(function(response){
					Materialize.toast('Evento cadastrado!', 4000, 'green')
				})
				.catch(function(err){
					Materialize.toast('Erro ao cadastrar!', 4000, 'red')
				})
				.finally(function(){
					$scope.load = false
				})*/
		}

		$scope.openModalEvent = function() {
			$('#modalRegisterEvent').modal('open')
		}

		$scope.openModalDay = function() {
			$('#modalRegisterDay').modal('open')
		}
	},
])