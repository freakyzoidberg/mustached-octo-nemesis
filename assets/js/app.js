(function(){
'use strict';

angular
  .module('mustachedOctoNemesis', [
    'ui.router',
    'login',
    'front',
    'dashboard'
  ])
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }])

})();
