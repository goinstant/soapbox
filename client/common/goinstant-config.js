/* global module */

'use strict';

var CONNECT_URL = 'https://goinstant.net/mattcreager/soapbox-dev';


module.exports = function($goConnectionProvider) {
  var origin = window.location.origin;
  var path = window.location.pathname;
  var returnTo = origin + path;

  $goConnectionProvider.$set(CONNECT_URL);
  $goConnectionProvider.$loginUrl(['Twitter']);
  $goConnectionProvider.$logoutUrl(returnTo);
};
