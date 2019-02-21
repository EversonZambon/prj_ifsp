weComp.factory('supportAPI', ['$http', 'env', function ($http, env) {
  var _createSupport = function (support){
    return $http.post(`postRegisterSupport/`,support)
  }
  var _deleteSupport = function (id) {
    return $http.post(`postDeleteSupport/${id}`)
  }
  var _showSupports = function (){
    return $http.get(`showSupports/`)
  }
  return {
    createSupport: _createSupport,
    deleteSupport: _deleteSupport,
    showSupports: _showSupports
  }
}])