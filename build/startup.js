(function() {
    'use strict';
    var app = angular.module("Stadium", ['ui.bootstrap', 'usMapDirective', 'datePickerDirective', 'ui.router']);

    app.constant("appSettings", {
        baseAPIUrl: "http://localhost:3000"
    });

    app.config(['$stateProvider',
        function($stateProvider) {
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            }).state('form', {
                url: '/{team:int}/form',
                templateUrl: 'views/form.html',
                controller: 'FormController'
            }).state('surrounding', {
                url: '/{team:int}/surrounding?date',
                templateUrl: 'views/surrounding.html',
                controller: 'SurroundingController'
            }).state('map', {
                url: '/{team:int}/map?date',
                templateUrl: 'views/map.html',
                controller: 'MapController'
            })
        }
    ]);

    app.directive('markerList', function() {
        return {
            restrict: 'E',
            templateUrl: 'markerList.html',
            controller: function($scope) {
                $scope.remove = function(index) {
                    $scope.removeMarker(index);
                };
            }
        }
    });

})();
