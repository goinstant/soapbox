/* global angular, module, require */

'use strict';

module.exports = angular.module('sb.auth', [])
  .run(require('./secure-route'))
  .factory('Authorization', require('./authorization-factory').factory);
