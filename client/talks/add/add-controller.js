/* global module, _ */

'use strict';

module.exports = function AddCtrl($scope, $goUsers, $state, Talk) {
  // Defaults
  $scope.talkVisibility = 'public';

  $scope.$on("$destroy", function() {
    console.log('Destroy has been emitted on the AddCtrl');
  });

  $scope.submitTalkForm = function(isValid) {
    $scope.submitted = true;

    if (!isValid) return;

    $goUsers().$self().then(function(selfModel) {
      var talkData = {
        title: $scope.title,
        description: $scope.description,
        duration: $scope.duration,
        deck: $scope.deck,
        video: $scope.video,
        author: selfModel.id
      };

      var talk = new Talk(talkData);

      talk.$save().then(function() {
        $state.go('talks.detail', { talkId: talk.$id });
        talk.$destroy();
      });
    });
  };
};
