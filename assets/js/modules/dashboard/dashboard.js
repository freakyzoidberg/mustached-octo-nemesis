(function(){
  'use strict';

  var dashboardCtrl = function($state) {
  };

  angular
  .module('dashboard', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root.dashboard', {
      url: '/dashboard',
      template: JST['assets/js/modules/dashboard/dashboard.html'](),
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard'
    });
  }])
  .controller('DashboardCtrl', [
  '$state',
  dashboardCtrl
  ]);

})();
