(function(){
  'use strict';

  angular
  .module('mustachedOctoNemesis')
  .constant('ApiInfo', {
    url: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')
  });

})();
