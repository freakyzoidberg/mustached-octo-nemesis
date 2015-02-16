(function(){
'use strict';

var loginService = function($q, $http, ApiInfo) {

  this.login = function(data) {
    return $http.post(ApiInfo.url + '/user/login', data);
  };
  this.signup = function(data) {
    return $http.post(ApiInfo.url + '/user/signup', data);
  };
  this.me = function() {
    return $http.get(ApiInfo.url + '/user/me');
  };
};

angular
  .module('mustachedOctoNemesis')
  .service('LoginService', [
    '$q',
    '$http',
    'ApiInfo',
    loginService
  ]);

})();
