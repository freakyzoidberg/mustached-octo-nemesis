(function() {
  "use strict";

  angular
  .module('mustachedOctoNemesis')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('in',{
      template: JST['assets/js/layouts/in.html']()
    })
    .state('out',{
      template: JST['assets/js/layouts/out.html']()
    });
  }]);
}());
