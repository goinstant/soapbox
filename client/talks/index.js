/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.talks', [
    require('../components/talk').name,
    require('./list').name,
    require('./detail').name,
    require('./add').name
  ]);
