(function(){
'use strict';

angular
  .module('mustachedOctoNemesis', [
    'ui.router',
    'login',
    'front',
  ])
  .config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }])

})();
