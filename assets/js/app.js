(function(){
'use strict';

angular
  .module('mustachedOctoNemesis', [
    'ui.router',
    'login',
  ])
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  }])

})();
