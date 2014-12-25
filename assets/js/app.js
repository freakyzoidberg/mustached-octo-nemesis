(function(){
'use strict';

angular
  .module('mustachedOctoNemesis', [
    'ui.router',
    'LocalStorageModule',
    'login',
    'front',
    'dashboard'
  ])
  .factory('AuthInterceptor', ['$q', '$injector', function($q, $injector) {
    var LocalService = $injector.get('localStorageService');
    return {
      request: function(config) {
        var token;
        if (LocalService.get('token')) {
          config.headers.Authorization = 'Bearer ' +  LocalService.get('token');
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          LocalService.remove('token');
          $injector.get('$state').go('login');
        }
        return $q.reject(response);
      }
    }
  }])
  .config([
    '$urlRouterProvider',
    'localStorageServiceProvider',
    '$httpProvider',
    function($urlRouterProvider, localStorageServiceProvider, $httpProvider) {
      $urlRouterProvider.otherwise('/');
      localStorageServiceProvider.setPrefix('mustached');
      $httpProvider.interceptors.push('AuthInterceptor');
  }])
  .run(['$rootScope', '$state', 'User', function ($rootScope, $state, User) {
    $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !User.currentUser()) {
        if (User.currentToken()) {
          console.debug("we have a token we could attempt to fill the user here");
        }
        $state.transitionTo("login");
        e.preventDefault();
      }
    })
  }]);

})();
