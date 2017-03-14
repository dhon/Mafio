angular.module('app.routes', ['ui.router', 'app.controllers', 'app.services'])
.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('home', {
            url: '/',
            templateUrl: '/../home.html',
            controller: 'homeCtrl'
        })

        .state('night', {
            url: '/night',
            templateUrl: '/../night.html',
            controller: 'nightCtrl'
        })

        .state('day', {
            url: '/day',
            templateUrl: '/../day.html',
            controller: 'dayCtrl'
        })

        .state('vote', {
            url: '/vote',
            templateUrl: '/../vote.html',
            controller: 'voteCtrl'
        })

        .state('log', {
            url: '/log',
            templateUrl: '/../log.html',
            controller: 'logCtrl'
        })

        .state('results', {
            url: '/results',
            templateUrl: '/../results.html',
            controller: 'resultsCtrl'
        })

    $urlRouterProvider.otherwise('/')

});