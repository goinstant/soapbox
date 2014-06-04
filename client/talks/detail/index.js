/* global angular, module, require */

'use strict';

module.exports = angular
  .module('lnl.talks.detail', [])
  .controller('TalksDetailCtrl', require('./detail-controller'));