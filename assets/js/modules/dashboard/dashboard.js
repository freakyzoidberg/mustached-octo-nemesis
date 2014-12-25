(function(){
  'use strict';

  var dashboardCtrl = function($state, User) {
    this.userData = User.currentUser();
  };

  angular
  .module('dashboard', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root.dashboard', {
      url: '/dashboard',
      template: JST['assets/js/modules/dashboard/dashboard.html'](),
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard',
      authenticate: true
    });
  }])
  .controller('DashboardCtrl', [
  '$state',
  'User',
  dashboardCtrl
  ]);

})();
