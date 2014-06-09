/* global module, _ */

'use strict';

module.exports = function AddCtrl($scope, $goKey, $goUsers, $state) {
  // Defaults
  $scope.talkVisibility = 'public';

  $scope.submitTalkForm = function(isValid) {
    $scope.submitted = true;

    if (!isValid) return;

    $goUsers().$self().then(function(selfModel) {
      var talks = $goKey('talks/org').$key($scope.talkVisibility);
      var talkData = {
        title: $scope.title,
        description: $scope.description,
        duration: $scope.duration,
        deck: $scope.deck,
        video: $scope.video,
        author: selfModel.id
      };

      talks.$add(talkData).get('context').then(function(context) {
        var talkId = _.last(context.addedKey.split('/'));

        $state.go('talks.detail', { talkId: talkId });
      });
    });
  };
};
