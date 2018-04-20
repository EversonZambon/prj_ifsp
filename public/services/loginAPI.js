weComp.factory('loginAPI', ['$http', 'env', function ($http, env) {
  var _signIn = function (user){
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
    signIn: _signIn,
    registerUser: _registerUser,
    updateUser: _updateUser,
    passwordRecover: _passwordRecover,
  }
}])