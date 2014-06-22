/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.talks.list', [])
  .controller('TalksListCtrl', require('./list-controller'));
