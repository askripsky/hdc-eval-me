'use strict';

angular.module('evalMeApp')
    .controller('MainCtrl', function ($scope, $location) {

        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || '';
            return page === currentRoute ? 'active' : '';
        };
    });
