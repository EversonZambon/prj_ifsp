weComp.factory('loginAPI', ['$http', 'env', function ($http, env) {
  var _logIn = function (user){
    return $http.post(`postLogin/`, user)
  }
  var _registerUser = function (user){
    return $http.post(`postRegisterUser/`, user)
  }
  var _updateUser = function(user){
    return $http.post(`postUpdateUser/`, user)
  }
  var _passwordRecover = function(email){
  	return $http.post(`postRecoverPassword/${email}`)
  }
  return {
    logIn: _logIn,
    registerUser: _registerUser,
    updateUser: _updateUser,
    passwordRecover: _passwordRecover,
  }
}])