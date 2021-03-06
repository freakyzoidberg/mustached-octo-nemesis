(function(){
  'use strict';
  var TYPES = [
    {
      norm: "postgresql",
      name: "PostgreSQL",
      icon: 'dbs-postgresql'
    },
    {
      norm: "mongodb",
      name: "MongoDB",
      icon: 'dbs-mongodb'
    }
  ];
  var backendsCtrl = function($rootScope, $state, BackendsService) {
    var that = this;
    this.icon = function(backend) {
      console.log();
      return TYPES.filter(function ( obj ) {
        return obj.norm === backend.type;
      })[0].icon;
    };
    var ok = function(resp) {
      console.debug('backends getAll: ok', resp.data);
      that.backends = resp.data.backends;
    };

    var err = function() {
      console.debug('backends getAll: error');
    };

    var not = function() {
      console.debug('backends getAll: notice');
    };

    var getBackends = function() {
      BackendsService.getAll().then(ok, err, not);
    };

    BackendsService.registerObserverCallback(getBackends);
    getBackends();
  };

  var backendsFormCtrl = function($rootScope, $state, $stateParams, BackendsService) {
    var that = this;
    this.types = TYPES;
    if ($stateParams.id) {
      var ok = function(resp) {
        console.debug('backends getOne: ok', resp.data.backend);
        that.data = resp.data.backend;
      };

      var err = function() {
        console.debug('backends getOne: error');
      };

      var not = function() {
        console.debug('backends getOne: notice');
      };
      BackendsService.get($stateParams.id).then(ok, err, not);
    }


    this.save = function() {
      var ok = function(data) {
        console.debug('backends form: ok', data);
        BackendsService.notifyObservers();
        if (!$stateParams.id)
          that.data = null;
          $state.go("in.backends");
      };

      var err = function() {
        console.debug('backends form: error');
      };

      var not = function() {
        console.debug('backends form: notice');
      };
      if ($stateParams.id) {
        console.log(that.data);
        BackendsService.update(that.data).then(ok, err, not);
      } else {
        BackendsService.create(that.data).then(ok, err, not);
      }
    };
  };

  angular
  .module('backends', [])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
    .state('in.backends', {
      url: '/backends',
      template: JST['assets/js/modules/backends/backends.html'](),
      controller: 'BackendsCtrl',
      controllerAs: 'backends',
    })
    .state('in.backends.create', {
      url: '/backends/create',
      template: JST['assets/js/modules/backends/form.html'](),
      controller: 'BackendsFormCtrl',
      controllerAs: 'backendsForm',
      authenticate: true
    })
    .state('in.backends.edit', {
      url: '/backends/edit/:id',
      template: JST['assets/js/modules/backends/form.html'](),
      controller: 'BackendsFormCtrl',
      controllerAs: 'backendsForm',
      authenticate: true
    });
  }])
  .controller('BackendsCtrl', [
  '$rootScope',
  '$state',
  'BackendsService',
  backendsCtrl
  ])
  .controller('BackendsFormCtrl', [
  '$rootScope',
  '$state',
  '$stateParams',
  'BackendsService',
  backendsFormCtrl
  ]);

})();
