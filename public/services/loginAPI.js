weComp.factory('loginAPI', ['$http', 'env', function ($http, env) {
  var _find = function (user) {
    return $http.post(`postLogin/`, user)
  }

  return {
    find: _find,
  }
}])