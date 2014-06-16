/* global module */

'use strict';

module.exports = function DetailCtrl($scope, currentTalk) {
  $scope.currentTalk = currentTalk;

  $scope.$on('$destroy', currentTalk.$destroy.bind(currentTalk));
};
