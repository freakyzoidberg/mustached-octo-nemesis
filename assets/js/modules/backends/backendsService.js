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
    this.getAll = function() {
      return $http.get(ApiInfo.url + '/backend');
    }
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
