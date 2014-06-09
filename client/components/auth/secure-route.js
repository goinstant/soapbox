/* global module */

'use strict';

module.exports = function secureRoute($rootScope, $goConnection, Authorization) {
  $rootScope.$on('$stateChangeStart', stateChangeHandler);

  function stateChangeHandler(event, toState, toStateParams, fromState) {
    // I hate that this is necessary
    // but the authorization factory expects these to be available
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;
    $rootScope.fromState = fromState;

    if ($goConnection.$ready().isPending()) return;

    var authorization = new Authorization();

    if (authorization.isApproved()) return;

    authorization.redirect(event);
  }
};
