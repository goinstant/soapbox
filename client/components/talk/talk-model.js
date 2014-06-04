/* global module */

'use strict';

module.exports = Talk;

function Talk() {
  console.log('new talk returned');
}

Talk.factory = function() {
  return new Talk();
};