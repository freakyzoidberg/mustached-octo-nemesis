(function(){
'use strict';

var loginCtrl = function($state, LoginService, UserData) {
  this.user = "Hello";
  this.userLogin = function() {
    var data = {
      name: this.name,
      password: this.password
    };

    var ok = function() {
      UserData.name = data.name;
      console.log('login: accept');
      //$state.go('dashboard');
    };

    var err = function() {
      console.log('login: error');
    };

    var not = function() {
      console.log('login: notice');
    };

    LoginService.login(data).then(ok, err, not);
  };
};

angular
  .module('login', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: '<h1>Login</h1>',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      });
  }])
  .controller('LoginCtrl', [
    '$state',
    'LoginService',
    'UserData',
    loginCtrl
  ]);

})();
