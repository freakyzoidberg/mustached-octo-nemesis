(function(){
'use strict';

angular
  .module('mustachedOctoNemesis', [
    'ui.router',
    'ui.gravatar',
    'LocalStorageModule',
    'login',
    'front',
    'backends',
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
    'gravatarServiceProvider',
    function($urlRouterProvider, localStorageServiceProvider, $httpProvider, gravatarServiceProvider) {
      $urlRouterProvider.otherwise('/');
      localStorageServiceProvider.setPrefix('mustached');
      $httpProvider.interceptors.push('AuthInterceptor');
      gravatarServiceProvider.defaults = {
        size     : 100,
        "default": 'retro'  // Mystery man as default for missing avatars
      };
      gravatarServiceProvider.secure = true;
    }
  ])
  .run([
    '$rootScope',
    '$state',
    '$http',
    'UserFactory',
    'LoginService',
    function ($rootScope, $state, $http, UserFactory, LoginService) {
      $rootScope.userData = UserFactory.currentUser();
      $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && UserFactory.currentUser().id == null) {
          if (UserFactory.currentToken()) {
            console.debug("we have a token we could attempt to fill the user here");
            LoginService.me().then(function(resp) {
              UserFactory.setUser(resp.data.user);
            }, function() {
              $state.transitionTo("login");
              e.preventDefault();
            })
          } else {
            $state.transitionTo("login");
            e.preventDefault();
          }
        }
      });
    }
  ]);

})();
