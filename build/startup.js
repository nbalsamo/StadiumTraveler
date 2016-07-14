(function() {
    'use strict';
    var app = angular.module("Stadium", ['ui.bootstrap', 'calendarDirective', 'ui.router', 'scheduleListDirective']);

    console.log('does this get called');



    var baseAPIUrl = process.env.baseAPIUrl || 'http://localhost:3000';

    app.constant("appSettings", {
        baseAPIUrl: baseAPIUrl
    });

    app.config(['$stateProvider',
        function($stateProvider) {
            $stateProvider
                .state('root', {
                    abstract: true,
                    url: '',
                    views: {
                        'header': {
                            templateUrl: 'views/header.html',
                            controller: 'HeaderController'
                        }
                    }
                })
                .state('root.home', {
                    url: '/home',
                    views: {
                        'container@': {
                            templateUrl: 'views/home.html',
                            controller: 'HomeController'
                        }
                    }
                })
                .state('root.surrounding', {
                    url: '/{team:int}/surrounding/?date&distance',
                    views: {
                        'container@': {
                            templateUrl: 'views/surrounding.html',
                            controller: 'SurroundingController'
                        }
                    }
                }).state('root.schedule', {
                    url: '/schedule/{teamID:int}/',
                    views: {
                        'container@': {
                            templateUrl: 'views/scheduleList.html',
                            controller: 'ScheduleListController'
                        }
                    }
                })
        }
    ]);
})();
