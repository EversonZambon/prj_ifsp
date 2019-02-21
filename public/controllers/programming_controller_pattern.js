weComp.controller("programming_controller_pattern", ['$scope', 'programmingAPI', '$filter',
	function ($scope, programmingAPI, $filter){

		$scope.load = false
		$scope.events = {};
		$scope.days = {};

		(function showEvents(){
			$scope.load = true
			programmingAPI.showEvents()
			.then(function (response){
				$scope.events = response.data
				for(var i in $scope.events){
					$scope.events[i].day = $filter('date')($scope.events[i].day,'dd/MM/yyyy')
					var hourstart = $scope.events[i].hourstart.split(':')
					$scope.events[i].hourstart = hourstart[0] + ":" + hourstart[1]
					var hourfinish = $scope.events[i].hourfinish.split(':')
					$scope.events[i].hourfinish = hourfinish[0] + ":" + hourfinish[1]
				}
			})
			.catch(function (err){
				Materialize.toast('Erro ao carregar os eventos!', 4000, "red")
			})
			.finally(function (){
				$scope.load = false
			})
		}());

		(function showDays(){
			$scope.load = true
			programmingAPI.showDays()
			.then(function (response){
				$scope.days = response.data
				for(var i in $scope.days){
                    $scope.days[i].dayFormat = $filter('date')($scope.days[i].day,'dd/MM/yyyy | EEEE')
                    $scope.days[i].day = $filter('date')($scope.days[i].day,'dd/MM/yyyy')
				}
			})
			.catch(function (err){
				Materialize.toast('Erro ao carregar os dias!', 4000, "red")
			})
			.finally(function (){
				$scope.load = false
			})
		}());

		(function getEventsOnDays(){
        $scope.load = true
        programmingAPI.getEventsOnDays()
          .then(function (response){
          	$scope.eventOnDays = response.data
          	for(var i in $scope.eventOnDays){
              	$scope.eventOnDays[i].day =$filter('date')($scope.eventOnDays[i].day,'dd/MM/yyyy') 	
          	}
          })
          .catch(function (err){
            Materialize.toast('Erro ao carregar a programação!', 4000, "red")
          })
          .finally(function (){
            $scope.load = false
          })
     	}());

		$scope.openEventInfo = function(event){
			$scope.eventInfo = event
			$('#modalViewInfo').modal('open')
		}
	},
])