(function() {
    'use strict';
    angular.module('Stadium').controller('SurroundingController', ['$scope', '$compile', '$state', 'ScheduleService',
        function($scope, $compile, $state, ScheduleService) {
            console.log('this get called at teh start;');
            /*$scope.teamID = $state.params.team;
            $scope.date = $state.params.date;

            var date = new Date($scope.date);

            ScheduleService.getSurroundingSchedule($scope.teamID, date.toDateString()).then(function (response) {
                console.log(response);
                $scope.surroundingSchedule = response.Data;
            });
            $scope.goHome = function () {
                $state.go('home');
            }*/
        }
    ]);
})();
