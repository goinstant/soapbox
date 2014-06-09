/* global angular, module */

'use strict';

module.exports = angular.module('sb.controllers', [])
  .controller('AppCtrl', function($scope, $goConnection, $goUsers, $state) {
    $scope.conn = $goConnection;
    $scope.users = $goUsers();
    $scope.users.$self();
    $scope.provider = $scope.conn.loginProviders[0];

    $goConnection.$ready().then(function() {
      window.thisDude = $scope.users;
    });

    $scope.$on('$stateChangeError', function() {
      console.log(arguments);
    });
  });
