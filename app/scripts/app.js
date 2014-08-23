'use strict';

angular
    .module('evalMeApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                redirectTo: '/eval'
            })
            .when('/eval', {
                templateUrl: 'views/eval.html',
                controller: 'EvalCtrl'
            })
            .when('/staticResults', {
                templateUrl: 'views/staticResults.html',
                controller: 'StaticResultsCtrl'
            })
            .when('/realTimeResults', {
                templateUrl: 'views/realTimeResults.html',
                controller: 'RealTimeResultsCtrl'
            })
            .otherwise({
                redirectTo: '/eval'
            });
    });
