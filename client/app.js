/* global angular, require */

'use strict';

angular
  .module('Soapbox', [
    'ui.router',
    require('./components/navigation').name,
    require('./components/login').name,
    require('./talks').name,
    require('./app-controller').name
  ])
  .config(require('./common/app-state.js'))
  .constant('version', require('../package.json').version);