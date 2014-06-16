/* global module, _ */

'use strict';

module.exports = function ListCtrl($scope, $goKey, $goUsers) {
  $scope.talks = $goKey('talks/org/public').$sync();

  $scope.$on("$destroy", function() {
    console.log('talks go bye bye');
  });

  $scope.talks.$on('ready', function() {
    _.each($scope.talks.$omit(), function(talk, talkId) {
      $scope.talks[talkId].author = $goUsers().$getUser(talk.author).$sync();
    });
  });
};
