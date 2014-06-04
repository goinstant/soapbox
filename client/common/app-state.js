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
      });
  }
];
