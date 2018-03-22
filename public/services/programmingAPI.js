weComp.factory('programmingAPI', ['$http', 'env', function ($http, env) {
  var _create = function (user) {
    return $http.post(`postRegisterProgramming/`, user)
  }

  return {
    create: _create,
  }
}])