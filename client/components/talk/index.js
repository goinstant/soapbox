/* global angular, module, require */

'use strict';

module.exports = angular
  .module('lnl.talk', [])
  .factory('TalkModel', require('./talk-model.js').factory);