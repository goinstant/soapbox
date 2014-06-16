/* global module, _ */

'use strict';

module.exports = Talk;

function Talk() {

}

Talk.factory = function($goUsers, $goKey, $timeout) {
  Talk.key = $goKey('talks/org/public');
  Talk.to = $timeout;

  return function(talkId) {
    if (!_.isObject(talkId)) return new Talk(talkId);

    var talkData = talkId;
    var talk = new Talk();

    return talk.$set(talkData);
  };
};

Talk.prototype.$set = function(talkData) {
  _.merge(this, talkData);

  return this;
};

Talk.prototype.$save = function() {
  var talkData = this.$omit();
  var self = this;

  if (this.$key) return this.$key.$set(talkData);

  return Talk.key.$add(talkData).get('context').then(function(context) {
    self.$id = _.last(context.addedKey.split('/'));
    self.$key = Talk.key.$key(self.$id);
  });
};

Talk.prototype.$omit = function() {
  return _.omit(this, function(value, key){
    return _.first(key) === '$' || key === 'constructor';
  });
};

Talk.prototype.$destroy = function() {
  return this.$key.$destroy();
};
