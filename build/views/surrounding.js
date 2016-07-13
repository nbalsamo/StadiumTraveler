(function() {
    'use strict';
    angular.module('Stadium').controller('SurroundingController', ['$scope', '$compile', '$state', 'TeamService',
        function($scope, $compile, $state, TeamService) {
            $scope.teamID = $state.params.team;
            $scope.date = $state.params.date;
            $scope.distance = 20;
            var date = new Date($scope.date);

            $scope.searchSurrounding = function() {
                TeamService.getSurroundingSchedule($scope.teamID, date.toDateString(), $scope.distance)
                    .then(function(response) {
                        $scope.surroundingSchedule = response;
                    });
            }

            $scope.searchSurrounding();
        }
    ]);
})();
