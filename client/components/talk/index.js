/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.talk', [])
  .factory('TalkModel', require('./talk-model.js').factory);