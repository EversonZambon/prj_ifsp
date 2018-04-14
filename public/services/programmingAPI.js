weComp.factory('programmingAPI', ['$http', 'env', function ($http, env) {
  var _createEvent = function (event) {
    return $http.post(`postRegisterEvent/`, event)
  }
  var _createDay = function (day) {
    return $http.post(`postRegisterDay/${day}`)
  }
  var _deleteDay = function (day) {
    return $http.post(`postDeleteDay/${day}`)
  }
  var _showEvents = function () {
    return $http.get(`showEvents/`)
  }
  var _showDays = function () {
    return $http.get(`showDays/`)
  }
  return {
    createEvent: _createEvent,
    createDay: _createDay,
    deleteDay: _deleteDay,
    showEvents: _showEvents,
    showDays: _showDays
  }
}])