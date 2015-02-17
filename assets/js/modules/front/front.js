(function(){
  'use strict';

  var frontCtrl = function($state, $rootScope) {
    $rootScope.$on("logged-in", function() {
      $state.transitionTo("in.dashboard");
    });
  };

  angular
  .module('front', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('out.front', {
      url: '/',
      template: JST['assets/js/modules/front/front.html'](),
      controller: 'FrontCtrl',
      controllerAs: 'front',
      authenticate: false
    });
  }])
  .controller('FrontCtrl', [
  '$state',
  '$rootScope',
  frontCtrl
  ]);

})();
