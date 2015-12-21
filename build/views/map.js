(function () {
    'use strict';
    angular.module('Stadium').controller('MapController', ['$scope', '$compile', '$state', 'ScheduleService',
        function ($scope, $compile, $state, ScheduleService) {

            $scope.teamID = $state.params.team;
            $scope.date = $state.params.date;

            var date = new Date($scope.date);

            $scope.markerToAdd = { 
                'ny' : {
                    type : 'image',
                    url: 'images/nhl/devil2.png',
                    width: 45,
                    height: 50,
                    latitude: 40.733619,
                    longitude: -74.17112640,
                    text : {content : ""},
                    tooltip : {content : "Limoge"}
                }
            }
                
            /*return to the home screen*/
            $scope.goHome = function () {
                console.log('wtf');
                $state.go('home');
            }
        }
    ]);
})();