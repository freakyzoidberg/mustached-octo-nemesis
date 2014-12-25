(function(){
  'use strict';

  var frontCtrl = function($state) {
  };

  angular
  .module('front', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('front', {
      url: '/',
      template: JST['assets/js/modules/front/front.html'](),
      controller: 'FrontCtrl',
      controllerAs: 'front',
      authenticate: false
    });
  }])
  .controller('FrontCtrl', [
  '$state',
  frontCtrl
  ]);

})();
