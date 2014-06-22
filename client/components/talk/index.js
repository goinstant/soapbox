/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.talk', [])
  .factory('Talk', require('./talk-model.js').factory)
  .factory('talkCollection', require('./talk-collection.js').factory);
