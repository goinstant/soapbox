/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.talks.add', [])
  .controller('TalksAddCtrl', require('./add-controller'));
