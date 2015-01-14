(function(){
  'use strict';

  var backendsCtrl = function($state, BackendsService) {
    var that = this;
    var ok = function(resp) {
      console.log('backends getAll: ok', resp.data);
      that.backends = resp.data.backends;
    };

    var err = function() {
      console.log('backends getAll: error');
    };

    var not = function() {
      console.log('backends getAll: notice');
    };

    var getBackends = function() {
      BackendsService.getAll().then(ok, err, not);
    }

    BackendsService.registerObserverCallback(getBackends);
    getBackends();
    ;
  };

  var backendsCreateCtrl = function($state, BackendsService) {

    this.save = function() {
      var that = this;
      var ok = function(data) {
        console.log('backends create: ok', data);
        BackendsService.notifyObservers();
        that.data = null;
      };

      var err = function() {
        console.log('backends create: error');
      };

      var not = function() {
        console.log('backends create: notice');
      };

      BackendsService.create(this.data).then(ok, err, not);
    };
  };

  angular
  .module('backends', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('root.backends', {
      template: JST['assets/js/modules/backends/backends.html'](),
      controller: 'BackendsCtrl',
      controllerAs: 'backends',
    })
    .state('root.backends.main', {
      url: '/backends',
      template: JST['assets/js/modules/backends/main.html'](),
      controller: 'BackendsCreateCtrl',
      controllerAs: 'backendsCreate',
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
  'BackendsService',
  backendsCtrl
  ])
  .controller('BackendsCreateCtrl', [
  '$state',
  'BackendsService',
  backendsCreateCtrl
  ]);

})();
