/* global module */

'use strict';

module.exports = function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/talks');

  $stateProvider
    .state('talks', {
      url: '/talks',
      resolve: {
        authenticate: function(Authorization) {
          var authorization = new Authorization();

          return authorization.process();
        }
      },
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
      restricted: true,
      views : {
        'main@': {
          templateUrl: '../talks/add/add.html',
          controller: 'TalksAddCtrl'
        }
      }
    })
    .state('talks.detail', {
      url: '/:talkId',
      views : {
        'main@': {
          templateUrl: '../talks/detail/detail.html',
          controller: 'TalksDetailCtrl'
        }
      }
    });
};
