'use strict';

var app = angular.module('evalMeApp');

app.factory('userService', function () {
        var service = {};

        service.userName = '';

        return service;
    });

app.value('firebaseUrl', 'https://evalme.firebaseio.com/');