(function(){
'use strict';

var loginController = function($state, LoginService, UserFactory) {
  this.userLogin = function() {
    var data = {
      email: this.email,
      password: this.password
    };

    var ok = function(resp) {
      UserFactory.setUser(resp.data.user);
      UserFactory.setToken(resp.data.token);
      $state.go('root.dashboard');
    };

    var err = function(err) {
      toastr.error('Login error', 'Invalid login or password')
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
      .state('login', {
        url: '/login',
        template: JST['assets/js/modules/login/login.html'](),
        controller: 'LoginController',
        controllerAs: 'login',
        authenticate: false
      })
      .state('signup', {
        url: '/signup',
        template: JST['assets/js/modules/login/signup.html'](),
        controller: 'LoginController',
        controllerAs: 'signup',
        authenticate: false
      })
  }])
  .controller('LoginController', [
    '$state',
    'LoginService',
    'UserFactory',
    loginController
  ]);

})();
