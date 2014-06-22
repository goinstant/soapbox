/* global module */

'use strict';

var models = [];

module.exports = function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/talks');

  $stateProvider
    .state('events', {
      url: '/events',
      views : {
        'main': {
          templateUrl: '../events/list/event-list.html',
          controller: 'EventListCtrl'
        },
        'nav': {
          templateUrl: '../components/navigation/navigation.html',
          controller: 'NavigationCtrl'
        }
      }
    })
    .state('events.add', {
      url: '/add',
      views: {
        'main@': {
          templateUrl: '../events/add/event-add.html',
          controller: 'EventAddCtrl'
        }
      }
    })
    .state('events.detail', {
      url: '/:eventId',
      views: {
        'main@': {
          templateUrl: '../events/detail/event-detail.html',
          controller: 'EventDetailCtrl'
        }
      }
    })
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
      views: {
        'main@': {
          templateUrl: '../talks/detail/detail-talk.html',
          controller: 'TalksDetailCtrl'
        }
      }
    });
};
