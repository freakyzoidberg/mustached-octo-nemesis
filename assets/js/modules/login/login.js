(function(){
'use strict';

var loginCtrl = function($state, LoginService, UserData) {
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

var signupCtrl = function($state, LoginService) {

};


angular
  .module('login', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        template: JST['assets/js/modules/login/login.html'](),
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('signup', {
        url: '/signup',
        template: JST['assets/js/modules/login/signup.html'](),
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
  }])
  .controller('LoginCtrl', [
    '$state',
    'LoginService',
    'UserData',
    loginCtrl
  ])
  .controller('SignupCtrl', [
    '$state',
    'LoginService',
    signupCtrl
  ]);

})();
