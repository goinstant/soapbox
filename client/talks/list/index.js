/* global angular, module, require */

'use strict';

module.exports = angular
  .module('lnl.talks.list', [])
  .controller('TalksListCtrl', require('./list-controller'));
