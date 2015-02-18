(function(){
  'use strict';

  var userFactory = function($q, $http, localStorageService, ApiInfo) {
    var user = {
      id: null,
      email: null,
      createdAt: null,
      updatedAt: null
    };

    return {
      setUser : function(u) {
        console.debug('setting user: ', u);
        user.email = u.email;
        user.id = u.id;
      },
      currentUser : function() {
        return user;
      },
      setToken : function(t) {
        console.debug('setting token: ', t);
        localStorageService.set('token', t);
      },
      currentToken : function() {
        var t = localStorageService.get('token');
        console.debug('retrieving token: ', t);
        return t;
      }
    };
  };

  angular
  .module('mustachedOctoNemesis')
  .factory('UserFactory', [
  '$q',
  '$http',
  'localStorageService',
  'ApiInfo',
  userFactory
  ]);

})();
