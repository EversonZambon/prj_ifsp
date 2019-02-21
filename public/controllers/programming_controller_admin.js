weComp.controller("programming_controller_admin", ['$scope', '$window', '$interval', 'programmingAPI', '$filter',
	function ($scope, $window, $interval, programmingAPI, $filter){

		$scope.load = false
		$scope.events = {};
		$scope.days = {};
		$scope.newEvent = {};
		$scope.eventOnDays = {};
		$scope.subscriber = {};

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
          .catch(function (err) {
          	console.log("erro",err)
            Materialize.toast('Erro ao carregar os eventos!', 4000, "red")
          })
          .finally(function () {
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

     	$(document).ready(function (){
	        $('#speaker-photo, #edit-speaker-photo').change(function (){
	            if (this.files.length > 0){
	                $.each(this.files, function (index, value){
	                	switch(value.type){
	                		case "image/png": break;
	                		case "image/jpeg": break;
	                		case "image/jpg": break;
	                		default:{
	                			Materialize.toast('Apenas arquivos de imagem!', 6000, 'red')
	                			$('#speaker-photo, #edit-speaker-photo').val('')
	                			return 0;
	                		}
	                	}
	                	if(value.size > 1000000){
	                		Materialize.toast('Foto até 900 KB!', 6000, 'red')
	                		$('#speaker-photo, #edit-speaker-photo').val('')
	                	}
	                })
	            }
	        });
	    });

   	    $scope.getSubscriberByIdEvent = function(idEvent){
	      $scope.load = true
	      programmingAPI.getSubscriberByIdEvent(idEvent)
	        .then(function (response){
	          $scope.subscriber = response.data
	        })
	        .catch(function (err){
	          Materialize.toast('Erro ao carregar os inscritos!', 4000, "red")
	        })
	        .finally(function (){
	          $scope.load = false
	        })
	    }

	    $scope.getSelectedPersons = function(){
	    	$scope.selecteds = [];
			for(var i in $scope.subscriber){
				if($('#check-'+i).prop('checked')==true){
					$scope.selecteds.push($scope.subscriber[i])
				}
			}
			if($scope.selecteds.length!=0){
				$scope.updatePresence($scope.selecteds)
			}else{
				Materialize.toast('Ninguém foi selecionado!', 4000, 'orange')
			}
		}

		$scope.updatePresence = function(selecteds){
			$scope.load = true
			programmingAPI.updatePresence(selecteds)
				.then(function(response){
					Materialize.toast('Certificados gerados!', 4000, 'green')
					$interval(function(){
						$window.location.reload();
					},700)
				})
				.catch(function(err){
					Materialize.toast('Erro gerar certificados!', 4000, 'red')
				})
				.finally(function(){
					$scope.load = false
				})
		}

     	$scope.createDay = function(newDay){
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

     	$scope.createEvent = function(newEvent){
			$scope.load = true
			newEvent.day = newEvent.day.split(' ')
			newEvent.day = newEvent.day[0].split('/').reverse().join('-')
			newEvent.classroom = $('#class-room').val();
			newEvent.hourstart = $('#hour-start').val();
			newEvent.hourfinish = $('#hour-finish').val();
			
			if($('#speaker-photo')[0].files[0]){
				var file = new FileReader();
				file.readAsDataURL($('#speaker-photo')[0].files[0]);
				file.onloadend = function () {
		    		newEvent.photo = file.result
		    		$scope.createEventDB(newEvent)
		  		}
			}else{
				newEvent.photo = "";
				$scope.createEventDB(newEvent)
			}
		}

		$scope.createEventDB = function(newEvent){
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

		$scope.updateEvent = function(editEvent){
			$scope.load = true
			editEvent.classroom = $('#edit-class-room').val();
			editEvent.hourstart = $('#edit-hour-start').val();
			editEvent.hourfinish = $('#edit-hour-finish').val();
			
			if($('#edit-speaker-photo')[0].files[0]){
				var file = new FileReader();
				file.readAsDataURL($('#edit-speaker-photo')[0].files[0]);
				file.onloadend = function () {
		    		editEvent.photo = file.result
		    		$scope.updateEventDB(editEvent)
		  		}
			}else{
				$scope.updateEventDB(editEvent)
			}
		}

		$scope.updateEventDB = function(editEvent){
			programmingAPI.updateEvent(editEvent)
				.then(function(response){
					Materialize.toast('Evento atualizado!', 4000, 'green')
					$interval(function(){
						$window.location.reload();
					},700)
				})
				.catch(function(err){
					console.log("erro",err)
					Materialize.toast('Erro ao atualizar!', 4000, 'red')
				})
				.finally(function(){
					$scope.load = false
				})
		}

		$scope.deleteDay = function(day){
			$scope.load = true
			day = day.split(' ')
			day = day[0].split('/').reverse().join('-')
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

		$scope.deleteEvent = function(id){
			$scope.load = true
			programmingAPI.deleteEvent(id)
				.then(function(response){
					Materialize.toast('Evento excluído!', 4000, 'green')
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

		$scope.selectAll = function(){
			if($(':checkbox').prop('checked')==false){
				$(':checkbox').prop('checked', true);
			}else{
				$(':checkbox').prop('checked', false);
			}
		}

		$scope.openModalDay = function(){
			$('#modalRegisterDay').modal('open')
		}

		$scope.openModalEvent = function(day){
			$scope.newEvent.day = day
			$('#modalRegisterEvent').modal('open')
		}

		$scope.openModalEditEvent = function(event){
			$scope.editEvent = event
			$('#edit-class-room').val($scope.editEvent.classroom)
			$('#edit-class-room').material_select()
			$("#div-edit-event").parent().find("label").addClass("active")
			$('#modalEditEvent').modal('open')
		}

		$scope.confirmDeleteDay = function(day){
			$scope.removeDay = day
			$('#modalDeleteDay').modal('open')
		}
		
		$scope.confirmDeleteEvent = function(event){
			$scope.removeEvent = event
			$('#modalDeleteEvent').modal('open')
		}

		$scope.removePhoto = function(event){
			$scope.editEvent.photo = ""
		}

		$scope.openEventInfo = function(event){
			$scope.eventInfo = event
			$('#modalViewInfo').modal('open')
		}

		$scope.openModalGenerateCertificate = function(event){
			$scope.getSubscriberByIdEvent(event.id)
			$scope.title = event.title
			$('#modalGenerateCertificate').modal('open')
		}

		$scope.openModalGeneratePresenceList = function(event){
			$scope.getSubscriberByIdEvent(event.id)
			$scope.title = event.title
			$('#modalGeneratePresenceList').modal('open')
		}	

		$scope.generateListPDF = function(titleEvent){
			$scope.load=true
			var rows = [
			    [],
			];
			for(var i in $scope.subscriber){
				rows[i] = []
				rows[i][0] = $scope.subscriber[i].name
				rows[i][1] = $scope.subscriber[i].cpf
			}
			var doc = new jsPDF('p', 'pt');
			var columns = ["NOME", "CPF", "ASSINATURA"];
			doc.text(40,30,titleEvent);
			doc.autoTable(columns, rows);
			doc.save("Lista_Inscritos_"+titleEvent+".pdf");
			$scope.load=false
		}
	},
])