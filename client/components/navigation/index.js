/* global angular, module, require */

'use strict';

module.exports = angular
  .module('lnl.navigation', [])
  .controller('NavigationCtrl', require('./navigation-controller.js'));