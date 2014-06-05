/* global angular, module */

'use strict';

module.exports = angular.module('sb.controllers', [])
  .controller('AppCtrl', function($scope, $goConnection, $goUsers, $state) {
    $scope.conn = $goConnection;
    $scope.users = $goUsers();
    $scope.users.$self();
    $scope.provider = $scope.conn.loginProviders[0];

    $goConnection.$ready().then(function() {
      console.log('connected to GI')
      window.thisDude = $scope.users;
    });

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
      console.log('kkk', $scope.conn.isGuest)
      if (toState.restricted && $scope.conn.isGuest) {
        var toUrl = (fromState.url === '^' ? 'talks' : fromState.name);
        $state.go(toUrl);
        event.preventDefault();
      }
    });
  });
