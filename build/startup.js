(function() {
    'use strict';
    var app = angular.module("Stadium", ['ui.bootstrap', 'calendarDirective', 'ui.router']);

    var baseAPIUrl = 'http://localhost:3000';
    //var baseAPIUrl = 'https://stadiumtraveler-api.herokuapp.com'
    app.constant("appSettings", {
        baseAPIUrl: baseAPIUrl
    });

    app.config(['$stateProvider',
        function($stateProvider) {
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).state('form', {
                url: '/{teamID:int}/form',
                templateUrl: 'views/form.html',
                controller: 'FormController'
            }).state('surrounding', {
                url: '/{team:int}/surrounding?date',
                templateUrl: 'views/surrounding.html',
                controller: 'SurroundingController'
            }).state('schedule', {
                url: '/schedule/{teamID:int}/',
                templateUrl: 'views/scheduleList.html',
                controller: 'ScheduleListController'
            })
        }
    ]);

})();
