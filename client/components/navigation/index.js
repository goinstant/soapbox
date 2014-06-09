/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.navigation', [])
  .controller('NavigationCtrl', require('./navigation-controller.js'));
