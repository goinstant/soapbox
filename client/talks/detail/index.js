/* global angular, module, require */

'use strict';

module.exports = angular.module('sb.talks.detail', [])
  .controller('TalksDetailCtrl', require('./detail-controller'));
