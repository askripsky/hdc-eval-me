'use strict';

angular.module('evalMeApp')
    .controller('StaticResultsCtrl', function ($scope, $timeout, firebaseUrl) {

        $scope.questions = [];

        var questionsRef = new Firebase(firebaseUrl).child('Questions');
        questionsRef.once("value", function (snapshot) {
            $timeout(function () {  // $timeout required or else Angular won't see change
                $scope.questions = snapshot.val();
            });
        });

        var evalsRef1 = new Firebase(firebaseUrl).child('Evaluations');
        evalsRef1.once("value", function (snapshot) {
            $timeout(function () {
                $scope.evaluators = snapshot.val();
                loadAverages();
            });
        });

        $scope.averages = {};

        function loadAverages() {
            var questionCount = {};
            var questionSums = {};

            angular.forEach($scope.evaluators, function (person) {
                angular.forEach($scope.questions, function (question) {

                    if (typeof person[question] !== 'undefined') {
                        verifyValueIsDefined(questionCount, question);
                        verifyValueIsDefined(questionSums, question);

                        questionCount[question]++;
                        questionSums[question] += Number(person[question]);
                    }
                });
            });

            angular.forEach($scope.questions, function (question) {
                $scope.averages[question] = questionSums[question] / questionCount[question];
            });
        }

        function verifyValueIsDefined(array, value) {
            if (typeof array[value] === 'undefined') {
                array[value] = 0;
            }
        }
    });
