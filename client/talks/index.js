/* global angular, module, require */

'use strict';

//var talk = require('../components/talk');

//console.log(talk)

module.exports = angular
  .module('lnl.talks', [
    require('../components/talk').name,
    require('./list').name,
    require('./detail').name,
    require('./add').name
  ]);