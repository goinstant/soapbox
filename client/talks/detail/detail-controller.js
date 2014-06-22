/* global module */

'use strict';

module.exports = function DetailCtrl($scope, $stateParams, talkCollection) {
  $scope.talk = talkCollection.findOne($stateParams.talkId);
};
