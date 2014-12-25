(function(){
'use strict';

var loginService = function($q, $http, ApiInfo) {

  this.login = function(data) {
    return $http.post(ApiInfo.url + '/user/login', data);
  };
  this.signup = function(data) {
    var url = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    return $http.post(ApiInfo.url + '/user/signup', data);
  }
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
