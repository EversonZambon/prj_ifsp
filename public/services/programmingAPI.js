weComp.factory('programmingAPI', ['$http', 'env', function ($http, env) {
  var _createEvent = function (event) {
    return $http.post(`postRegisterEvent/`,event)
  }
  var _createDay = function (day) {
    return $http.post(`postRegisterDay/${day}`)
  }
  var _updateEvent = function(event){
    return $http.post(`postUpdateEvent/`,event)
  }
  var _deleteDay = function (day) {
    return $http.post(`postDeleteDay/${day}`)
  }
  var _deleteEvent = function (id) {
    return $http.post(`postDeleteEvent/${id}`)
  }  
  var _registerInEvent = function(eventID, email){
    return $http.post(`postRegisterInEvent/${eventID},${email}`)
  }
  var _showEvents = function () {
    return $http.get(`showEvents/`)
  }
  var _showDays = function () {
    return $http.get(`showDays/`)
  }
  var _getSubscriberInfo = function(email){
    return $http.get(`getSubscriberInfo/${email}`)
  }

  return {
    createEvent: _createEvent,
    createDay: _createDay,
    updateEvent: _updateEvent,
    deleteDay: _deleteDay,
    registerInEvent: _registerInEvent,
    deleteEvent: _deleteEvent,
    showEvents: _showEvents,
    showDays: _showDays,
    getSubscriberInfo: _getSubscriberInfo
  }
}])