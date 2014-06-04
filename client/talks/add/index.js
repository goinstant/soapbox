/* global angular, module, require */

'use strict';

module.exports = angular
  .module('lnl.talks.add', [])
  .controller('TalksAddCtrl', require('./add-controller'));