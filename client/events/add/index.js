/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.events.talk', [])
  .controller('EventAddCtrl', require('./event-add-controller'));
