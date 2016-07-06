(function() {
    'use strict';
    angular.module('Stadium').controller('SurroundingController', ['$scope', '$compile', '$state', 'TeamService',
        function($scope, $compile, $state, TeamService) {
            $scope.teamID = $state.params.team;
            $scope.date = $state.params.date;

            var date = new Date($scope.date);

            TeamService.getSurroundingSchedule($scope.teamID, date.toDateString(), 20)
                .then(function(response) {
                    console.log(response);

                    $scope.surroundingSchedule = response;
                });
        }
    ]);
})();
