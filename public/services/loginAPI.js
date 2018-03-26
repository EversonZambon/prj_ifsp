weComp.factory('loginAPI', ['$http', 'env', function ($http, env) {
  var _find = function (user) {
    return $http.post(`postLogin/`, user)
  }
  var _test = function (number) {
    return $http.get(`teste/${number}`)
  }
  return {
    find: _find,
    test: _test,
  }
}])