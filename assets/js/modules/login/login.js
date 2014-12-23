(function(){
'use strict';

var loginCtrl = function($state, LoginService, UserData) {
  this.userLogin = function() {
    var data = {
      email: this.email,
      password: this.password
    };

    var ok = function(data) {
      UserData.email = data.email;
      console.log('login: accept', data);
      $state.go('dashboard');
    };

    var err = function() {
      console.log('login: error');
    };

    var not = function() {
      console.log('login: notice');
    };

    LoginService.login(data).then(ok, err, not);
  };
  this.userSignup = function() {
    var data = {
      email: this.email,
      password: this.password
    };
    var ok = function(data) {
      console.log('signup: accept', data);
      $state.go('login');
    };

    var err = function() {
      console.log('signup: error');
    };

    var not = function() {
      console.log('signup: notice');
    };

    LoginService.signup(data).then(ok, err, not);
  };
};

angular
  .module('login', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('root.login', {
        url: '/login',
        template: JST['assets/js/modules/login/login.html'](),
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('root.signup', {
        url: '/signup',
        template: JST['assets/js/modules/login/signup.html'](),
        controller: 'LoginCtrl',
        controllerAs: 'signup'
      })
  }])
  .controller('LoginCtrl', [
    '$state',
    'LoginService',
    'UserData',
    loginCtrl
  ]);

})();
