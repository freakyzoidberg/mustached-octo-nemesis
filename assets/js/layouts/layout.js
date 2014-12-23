(function() {
  "use strict";

  angular
  .module('mustachedOctoNemesis')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root',{
      template: JST['assets/js/layouts/root.html']()
    });
  }]);

}());
