weComp.factory('programmingAPI', ['$http', 'env', function ($http, env) {
  var _createEvent = function (event) {
    return $http.post(`postRegisterEvent/`, event)
  }
  var _showEvents = function () {
    return $http.get(`showEvents/`)
  }
  var _createDay = function (day) {
    return $http.post(`postRegisterDay/${day}`)
  }
  return {
    createEvent: _createEvent,
    showEvents: _showEvents,
    createDay: _createDay,
  }
}])