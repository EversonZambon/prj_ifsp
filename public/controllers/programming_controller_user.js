weComp.controller("programming_controller_user", ['$scope', '$cookies','$cookieStore', '$window', '$interval', 'programmingAPI', '$filter',
  function ($scope, $cookies, $cookieStore, $window, $interval, programmingAPI, $filter){

    $scope.load = false
    $scope.events = {};
    $scope.days = {};
    $scope.subscriber = {};
    $scope.currentUser;

    (function getInfo(){
      $scope.currentUser = $cookieStore.get('user');
    }());

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

    (function getSubscriberInfo(){
      $scope.load = true
      programmingAPI.getSubscriberInfo($scope.currentUser.email)
        .then(function (response){
          $scope.subscriber = response.data.result
        })
        .catch(function (err){
          Materialize.toast('Erro ao carregar os inscrições!', 4000, "red")
        })
        .finally(function (){
          $scope.load = false
        })
    }());

    (function getEventsOnDays(){
        $scope.load = true
        programmingAPI.getEventsOnDays()
          .then(function (response){
            $scope.eventOnDays = response.data.result
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

    (function getCertificates(){
      $scope.load = true
      programmingAPI.getCertificates($scope.currentUser.email)
        .then(function (response){
          $scope.certificates = response.data.result
          for(var i in $scope.certificates){
            $scope.certificates[i].day = $filter('date')($scope.certificates[i].day,'dd/MM/yyyy')
          }
        })
        .catch(function (err){
          Materialize.toast('Erro ao carregar os certificados!', 4000, "red")
        })
        .finally(function (){
          $scope.load = false
        })
    }());

    (function getCertificate(){
      $scope.certificate = $cookieStore.get('certificate')
    }());


    $scope.addSubscription = function(eventID){
      $scope.load = true
      programmingAPI.addSubscription(eventID, $scope.currentUser.email)
        .then(function (response){
            Materialize.toast('Inscrição realizada!', 4000, 'green')
            $interval(function(){
              $window.location.reload();
            },700)
       })
        .catch(function (err){
            if(err.data.error === "ER_DUP_ENTRY"){
              Materialize.toast('Você já está inscrito nesse evento!', 6000, 'orange')
            }else{
              Materialize.toast('Erro ao inscrever-se!', 4000, 'red')
            }
        })
        .finally(function (){
            $scope.load = false
        })
    }

    $scope.removeSubscription = function(){
      $scope.load = true
      programmingAPI.removeSubscription($scope.subscriptionEventID, $scope.currentUser.email)
        .then(function (response){
            Materialize.toast('Inscrição removida!', 4000, 'green')
            $interval(function(){
              $window.location.reload();
            },700)
        })
        .catch(function (err){
            Materialize.toast('Erro ao remover inscrição!', 4000, 'red')
        })
        .finally(function (){
            $scope.load = false
        })
    }

    $scope.downloadCertificate = function(){
      Materialize.toast('Aguarde o download!', 4000, 'orange')
      html2canvas(document.querySelector("#certificate"))
        .then(function(canvas){
          var img = canvas.toDataURL('image/png');
          var doc = new jsPDF('l', 'mm', 'a4');
          doc.addImage(img, 'png', 8, 8);
          doc.save('Certificado-WeComp.pdf');
        })
        .catch(function(err){
          Materialize.toast('Erro ao fazer o download!', 4000, 'red')
        })
        .finally(function(){
          Materialize.toast('Download concluido!', 4000, 'green')
        })
    }

    $scope.viewCertificate = function(certificate){
      $cookieStore.put('certificate', certificate)
      window.open('/certificado-visualizar');
    }

    $scope.openEventInfo = function(event){
      $scope.eventInfo = event
      $('#modalViewInfo').modal('open')
    }

    $scope.confirmDeleteSubscription = function(event){
      $scope.subscriptionEventID = event.id
      $('#modalRemoveSubscription').modal('open')
    }
	},
])