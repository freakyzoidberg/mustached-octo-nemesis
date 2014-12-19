(function(){
'use strict';

var loginService = function($q, $http) {
  this.login = function(data) {
    var deferred = $q.defer();
    setTimeout(function() {
      console.log("resolve");
      deferred.resolve();
    }, 1000);
    return deferred.promise;
  }
};

angular
  .module('mustachedOctoNemesis')
  .service('LoginService', [
    '$q',
    '$http',
    loginService
  ]);

})();
