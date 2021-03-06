'use strict';

angular.module('evalMeApp')
    .controller('RealTimeResultsCtrl', function ($scope, $firebase, firebaseUrl) {

        var questionsRef = new Firebase(firebaseUrl).child('Questions');
        $scope.questions = $firebase(questionsRef).$asObject();

        var evalsRef = new Firebase(firebaseUrl).child('Evaluations');
        $scope.evaluators = $firebase(evalsRef).$asArray();

        $scope.evaluators.$watch(loadAverages);

        $scope.averages = {};

        function loadAverages() {
            $scope.averages = {};
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
