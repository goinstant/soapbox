/* global module */

'use strict';

module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/talks');

    $stateProvider
      .state('talks', {
        url: '/talks',
        views : {
          'main': {
            templateUrl: '../talks/list/list.html',
            controller: 'TalksListCtrl'
          },
          'nav': {
            templateUrl: '../components/navigation/navigation.html',
            controller: 'NavigationCtrl'
          }
        }
      })
      .state('talks.add', {
        url: '/add',
        views : {
          'main@': {
            templateUrl: '../talks/add/add.html',
            controller: 'TalksAddCtrl'
          }
        }
      })
      .state('talks.detail', {
        url: '/:talkId',
        resolve: {
          currentTalk: function($q, $timeout, TalkModel, $stateParams) {
            var deferred = $q.defer();

            $timeout(function() {
               deferred.resolve(new TalkModel($stateParams.talkId));
            }, 500);

            return deferred.promise;
          }
        },
        views : {
          'main@': {
            templateUrl: '../talks/detail/detail.html',
            controller: 'TalksDetailCtrl'
          }
        }
      });
  }
];
