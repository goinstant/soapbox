/* global module */

'use strict';

module.exports = Talk;

function Talk(id) {
  console.log('new talk returned');
  this.id = id;
}

Talk.factory = function() {
  return function(id) {
    return new Talk(id);
  };
};