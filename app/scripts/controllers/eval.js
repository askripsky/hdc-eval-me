'use strict';

angular.module('evalMeApp')
    .controller('EvalCtrl', function ($scope, $timeout, $location, $log, $firebase, firebaseUrl, userService) {

        $scope.editMode = false;

        $scope.editName = function () {
            $scope.editMode = true;

            // break 3-way binding while user is typing
            unBindObject();

            $scope.evaluations = {};
        };

        var unBindObject = function () {
            // noop
        };

        $scope.saveName = function () {
            $scope.editMode = false;

            if ($scope.userName !== '') {
                var evalsRef = new Firebase(firebaseUrl).child('Evaluations').child($scope.userName);
                $firebase(evalsRef).$asObject().$bindTo($scope, 'evaluations').then(function (unbind) {
                    unBindObject = unbind;
                });
            }
        };

        $scope.evaluations = {};

        var questionsRef = new Firebase(firebaseUrl).child('Questions');
        $scope.questions = $firebase(questionsRef).$asObject();

        $scope.userName = userService.userName;

        $scope.saveEval = function () {
            $log.log($scope.evaluations);
        };
    });
