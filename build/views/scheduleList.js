(function() {
    'use strict';
    angular.module('Stadium').controller('ScheduleListController', ['$scope', '$compile', '$state', 'TeamService', 'ScheduleService',
        function($scope, $compile, $state, TeamService, ScheduleService) {
            var teamID = $state.params.teamID;

            TeamService.getTeamSchedule(teamID).then(function(response) {
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

            $scope.getSurrounding = function(game) {
                $state.go('surrounding', {
                    team: teamID,
                    date: game.date
                });
            }
        }
    ]);
})();