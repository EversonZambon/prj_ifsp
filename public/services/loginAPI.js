webComp.factory('loginAPI', ['$http', 'env', function ($http, env) {
  var _create = function (user) {
    return $http.post(`postLogin/`, user)
  }

  return {
    create: _create,
  }
}])
