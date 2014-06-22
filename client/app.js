/* global angular, require */

'use strict';

angular
  .module('Soapbox', [
    'ui.router',
    'goangular',
    require('./components/navigation').name,
    require('./components/auth').name,
    require('./components/user').name,
    require('./events').name,
    require('./talks').name,
    require('./app-controller').name
  ])
  .config(require('./common/app-state.js'))
  .config(require('./common/goinstant-config.js'))
  .constant('version', require('../package.json').version);
