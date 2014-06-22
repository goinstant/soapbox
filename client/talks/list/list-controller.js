/* global module, _ */

'use strict';

/* can I make talkCOllection a dependency of this sub-section? */
module.exports = function ListCtrl($scope, talkCollection) {
  $scope.talks = talkCollection.findAll();
};
