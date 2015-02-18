(function(){
'use strict';

angular
  .module('mustachedOctoNemesis', [
    'ui.router',
    'ui.gravatar',
    'ngMaterial',
    'ngMdIcons',
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
    };
  }])
  .config([
    '$urlRouterProvider',
    'localStorageServiceProvider',
    '$httpProvider',
    'gravatarServiceProvider',
    '$mdThemingProvider',
    function($urlRouterProvider, localStorageServiceProvider, $httpProvider, gravatarServiceProvider, $mdThemingProvider) {
      $urlRouterProvider.otherwise('/');
      localStorageServiceProvider.setPrefix('mustached');
      $httpProvider.interceptors.push('AuthInterceptor');
      gravatarServiceProvider.defaults = {
        size     : 100,
        "default": 'retro'  // Mystery man as default for missing avatars
      };
      gravatarServiceProvider.secure = true;
      // $mdThemingProvider.theme('default')
      //   .primaryPalette('teal')
      //   .accentPalette('amber')
      //   .warnPalette('pink');

        //Available palettes: red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green, light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
        //theme.primaryPalette, theme.accentPalette, theme.warnPalette, theme.backgroundPalette
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
        if (UserFactory.currentUser().id === null) {
          if (UserFactory.currentToken()) {
            console.debug("we have a token we could attempt to fill the user here");
            LoginService.me().then(function(resp) {
              UserFactory.setUser(resp.data.user);
              $rootScope.$broadcast("logged-in");
            }, function() {
              if (toState.authenticate) {
                $state.transitionTo("out.front");
                e.preventDefault();
              }
            });
          } else {
            if (toState.authenticate) {
              $state.transitionTo("out.front");
              e.preventDefault();
            }
          }
        }
      });
      $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams){
        $rootScope.state = toState.name;
      });
    }
  ]);

})();
