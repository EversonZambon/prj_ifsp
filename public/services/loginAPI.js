weComp.factory('loginAPI', ['$http', 'env', function ($http, env) {
  var _signIn = function (user) {
    return $http.post(`postLogin/`, user)
  }
  var _passwordRecover = function(email) {
  	return $http.post(`postRecoverPassword/${email}`)
  }
  return {
    signIn: _signIn,
    passwordRecover: _passwordRecover,
  }
}])