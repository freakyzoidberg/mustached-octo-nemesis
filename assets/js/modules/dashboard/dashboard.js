(function(){
  'use strict';

  var dashboardCtrl = function($state) {

  };

  angular
  .module('dashboard', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('in.dashboard', {
      url: '/dashboard',
      template: JST['assets/js/modules/dashboard/dashboard.html'](),
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard',
      authenticate: true
    });
  }])
  .controller('DashboardCtrl', [
  '$state',
  dashboardCtrl
  ]);

})();
