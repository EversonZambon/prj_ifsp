weComp.controller("certificates_controller_user", ['$scope', '$cookieStore', '$window', '$interval', 'certificateAPI', '$filter',
  function ($scope, $cookieStore, $window, $interval, certificateAPI, $filter){

    $scope.load = false
    $scope.currentUser;

    (function getInfo(){
      $scope.currentUser = $cookieStore.get('user');
    }());

    (function getCertificates(){
      $scope.load = true
      certificateAPI.getCertificates($scope.currentUser.email)
        .then(function (response){
          $scope.certificates = response.data
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
	},
])