/* global module, _ */

'use strict';

module.exports = function AddCtrl($scope, $goUsers, $state, Talk) {
  // Defaults
  $scope.talkVisibility = 'public';

  $scope.submitTalkForm = function(isValid) {
    $scope.submitted = true;

    if (!isValid) return;

    $goUsers().$self().then(function(selfModel) {
      var talkData = {
        title: $scope.title,
        description: $scope.description,
       // duration: $scope.duration,
        //deck: $scope.deck,
        //video: $scope.video,
        //author: selfModel.id
      };

      var talk = new Talk(talkData);

      $state.go('talks.detail', { talkId: 'id-146868da40d-000-0' });

      talk.$save().then(function() {
        console.log('done')

      });
    });
  };
};
