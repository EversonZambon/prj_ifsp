weComp.controller("programming_controller", ['$scope', 'programmingAPI', 'loginAPI', '$filter',
	function ($scope, programmingAPI, loginAPI, $filter){

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
                  	console.log("Eventos",$scope.events)
                  })
                  .catch(function (err) {
                    console.log(err)
                    Materialize.toast('Erro ao carregar a programção!', 4000, "red")
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
                    console.log(err)
                    Materialize.toast('Erro ao carregar os dias!', 4000, "red")
                  })
                  .finally(function () {
                    $scope.load = false
                  })
     	}());

     	$(document).ready(function() {

     		setTimeout(function(){
     			$('.collapsible').collapsible();
     		},700)
			 

			 $('.modal').modal();

			 $('.tooltipped').tooltip({delay: 50});

			 $('select').material_select();

			 $('.timepicker').pickatime({
			    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
			    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			    twelvehour: false, // Use AM/PM or 24-hour format
			    donetext: 'OK', // text for done-button
			    cleartext: 'Limpar', // text for clear-button
			    canceltext: 'Cancelar', // Text for cancel-button
			    autoclose: false, // automatic close timepicker
			    ampmclickable: true, // make AM PM clickable
			    aftershow: function(){} //Function for after opening timepicker
			});

			 $('.datepicker').pickadate({
				selectMonths: true,
				selectYears: 15,
				// Título dos botões de navegação
				labelMonthNext: 'Próximo Mês',
				labelMonthPrev: 'Mês Anterior',
				// Título dos seletores de mês e ano
				labelMonthSelect: 'Selecione o Mês',
				labelYearSelect: 'Selecione o Ano',
				// Meses e dias da semana
				monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
				weekdaysFull: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
				weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
				// Letras da semana
				weekdaysLetter: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
				//Botões
				today: 'Hoje',
				clear: 'Limpar',
				close: 'Ok',
				// Formato da data que aparece no input
				format: 'dd/mm/yyyy',
				onClose: function(){
					$(document.activeElement).blur()
				}
			 });
		}); 

     	$scope.registerDay = function(newDay) {
			$scope.load = true
			newDay = $('#day').pickadate('picker').get('highlight', 'yyyy-mm-dd');
			programmingAPI.createDay(newDay)
				.then(function(response){
					Materialize.toast('Dia cadastrado!', 4000, 'green')
				})
				.catch(function(err){
					console.log("Erro controller ",err)
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