weComp.controller("programming_controller_pattern", ['$scope', '$window', '$interval', 'programmingAPI', 'loginAPI', '$filter',
	function ($scope, $window, $interval, programmingAPI, loginAPI, $filter){

		$scope.load = false
		$scope.events = {};
		$scope.days = {};

		(function showEvents(){
			$scope.load = true
			programmingAPI.showEvents()
			.then(function (response){
				$scope.events = response.data.result
				for(var i in $scope.events){
					$scope.events[i].day = $filter('date')($scope.events[i].day,'dd/MM/yyyy')
					var hourStart = $scope.events[i].hourStart.split(':')
					$scope.events[i].hourStart = hourStart[0] + ":" + hourStart[1]
					var hourFinish = $scope.events[i].hourFinish.split(':')
					$scope.events[i].hourFinish = hourFinish[0] + ":" + hourFinish[1]
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
				$scope.days = response.data.result
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

		$scope.openEventInfo = function(event){
			$scope.eventInfo = event
			$('#modalViewInfo').modal('open')
		}
	},
])