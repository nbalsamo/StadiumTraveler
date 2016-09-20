(function() {
    'use strict';
    angular.module('Stadium').controller('ScheduleListController', ['$scope', '$compile', '$state', 'TeamService',

        function($scope, $compile, $state, TeamService) {
            var teamID = $state.params.teamID;
            $scope.selectedFilterText = "All Games";

            $scope.getSurrounding = function(game) {
                var gameDate = new Date(game.date);
                $state.go('root.surrounding', {
                    team: game.homeTeamID,
                    date: gameDate.toISOString()
                });
            }

            $scope.getSchedule = function(filter, selectedFilterText) {
                $scope.selectedFilterText = selectedFilterText;
                TeamService.getTeamSchedule(teamID, filter).then(function(response) {
                    if (response) {
                        $scope.schedule = response;
                    } else {
                        AlertService.addAlert({
                            title: 'Error',
                            message: 'Something went wrong!',
                            type: 'errorAlert',
                            alertClass: 'alert-danger',
                        });
                    }
                });
            }

            $scope.getSchedule();
        }
    ]);
})();
