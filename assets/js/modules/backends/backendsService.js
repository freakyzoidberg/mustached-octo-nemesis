(function(){
  'use strict';

  var backendsService = function($q, $http, ApiInfo) {

    var observerCallbacks = [];

    this.notifyObservers = function() {
      angular.forEach(observerCallbacks, function(callback){
        callback();
      });
    };

    this.registerObserverCallback = function(callback){
      observerCallbacks.push(callback);
    };

    this.create = function(data) {
      return $http.post(ApiInfo.url + '/backend', data);
    };
    this.update = function(data) {
      console.log(data);
      return $http.put(ApiInfo.url + '/backend/' + data.id , data);
    };
    this.get = function(id) {
      return $http.get(ApiInfo.url + '/backend/'+ id );
    };
    this.getAll = function() {
      return $http.get(ApiInfo.url + '/backend');
    };
  };

  angular
  .module('mustachedOctoNemesis')
  .service('BackendsService', [
  '$q',
  '$http',
  'ApiInfo',
  backendsService
  ]);

})();
