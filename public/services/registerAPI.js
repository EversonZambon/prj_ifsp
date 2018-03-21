webComp.factory('registerAPI', ['$http', 'env', function ($http, env) {
  var _create = function (user) {
    return $http.post(`postRegisterUser/`, user)
  }

  return {
    create: _create,
  }
}])