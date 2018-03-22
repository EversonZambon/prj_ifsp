webComp.factory('loginAPI', ['$http', 'env', function ($http, env) {
  var _find = function (user) {
    return $http.get(`postLogin/`, user)
  }

  return {
    find: _find,
  }
}])