weComp.factory('certificateAPI', ['$http', 'env', function ($http, env) {
  var _getCertificates = function(email){
    return $http.get(`getCertificates/${email}`)
  }
  return {
    getCertificates: _getCertificates
  }
}])