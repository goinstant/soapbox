/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.events', [
    require('../components/talk').name,
    require('./list').name
  ]);
