(function(){
'use strict';

var loginService = function($q, $http) {
  this.login = function(data) {
    var url = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    return $http.post(url + '/user/login', data);
  };
  this.signup = function(data) {
    var url = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    return $http.post(url + '/user/signup', data);
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
