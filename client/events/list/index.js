/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.events.list', [])
  .controller('EventListCtrl', require('./event-list-controller'));
