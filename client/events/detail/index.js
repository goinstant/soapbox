/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.events.detail', [])
  .controller('EventDetailCtrl', require('./event-detail-controller'));
