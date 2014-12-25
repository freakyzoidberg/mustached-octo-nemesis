(function(){
  'use strict';

  var userProvider = function($q, $http, localStorageService, ApiInfo) {
    var user;
    this.setUser = function(u) {
      console.debug('setting user: ', u)
      user = u;
    }
    this.currentUser = function() {
      console.debug('retrieving user: ', user);
      return user;
    }
    this.setToken = function(t) {
      console.debug('setting token: ', t);
      localStorageService.set('token', t);
    }
    this.currentToken = function() {
      var t = localStorageService.get('token');
      console.debug('retrieving token: ', t);
      return t;
    }
  };

  angular
  .module('mustachedOctoNemesis')
  .service('User', [
  '$q',
  '$http',
  'localStorageService',
  'ApiInfo',
  userProvider
  ]);

})();
