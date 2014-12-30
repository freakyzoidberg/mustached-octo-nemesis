(function(){
  'use strict';

  var backendsCtrl = function($state) {

  };

  var backendsCreateCtrl = function($state) {

  };

  angular
  .module('backends', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root.backends', {
      template: JST['assets/js/modules/backends/backends.html'](),
    })
    .state('root.backends.main', {
      url: '/backends',
      template: JST['assets/js/modules/backends/main.html'](),
      controller: 'BackendsCtrl',
      controllerAs: 'backends',
      authenticate: true
    })
    .state('root.backends.create', {
      url: '/backends/create',
      template: JST['assets/js/modules/backends/create.html'](),
      controller: 'BackendsCreateCtrl',
      controllerAs: 'backendsCreate',
      authenticate: true
    });
  }])
  .controller('BackendsCtrl', [
  '$state',
  backendsCtrl
  ])
  .controller('BackendsCreateCtrl', [
  '$state',
  backendsCreateCtrl
  ]);

})();
