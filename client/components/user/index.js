/* global angular, module, require */

'use strict';

module.exports = angular
  .module('sb.user', [])
  .factory('userCollection', require('./user-collection.js').factory);
