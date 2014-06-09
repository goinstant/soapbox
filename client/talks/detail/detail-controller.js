/* global module */

'use strict';

module.exports = function DetailCtrl($scope, $stateParams, $goKey, $goUsers) {
  $scope.currentTalk = $goKey('talks/org/public').$key($stateParams.talkId).$sync();

  $scope.currentTalk.$on('ready', function() {
    $scope.currentTalk.author = $goUsers().$getUser($scope.currentTalk.author).$sync();
  });
};
