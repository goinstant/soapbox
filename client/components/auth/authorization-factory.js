/* global module, require */

'use strict';

var _ = require('lodash');

module.exports = Authorization;

function Authorization($rootScope, $state, $goConnection) {
  _.extend(this, {
    $conn: $goConnection,
    $state: $state,
    restricted: $rootScope.toState && $rootScope.toState.restricted,
    toState: $rootScope.toState,
    toStateParams: $rootScope.toStateParams,
    fromState: $rootScope.fromState
  });
}

Authorization.factory = function($rootScope, $state, $goConnection) {
  return function() {
    return new Authorization($rootScope, $state, $goConnection);
  };
};

Authorization.prototype.isApproved = function() {
  if (!this.restricted) return true;
  if (!this.$conn.isGuest) return true;

  return false;
};

Authorization.prototype.redirect = function(event) {
  var toUrl = (this.fromState.url === '^' ? 'talks' : this.fromState.name);
  this.$state.go(toUrl);

  if (event) event.preventDefault();
};

Authorization.prototype.process = function() {
  var self = this;

  return this.$conn.$ready().then(function() {
    if (self.isApproved()) return;

    self.redirect();
  });
};
