(function() {
    'use strict';
    angular.module('Stadium').controller('HomeController', ['$scope', '$compile', '$state', 'TeamService', 'ScheduleService', 'AlertService',
        function($scope, $compile, $state, TeamService, ScheduleService, AlertService) {
            $scope.searchedTeam; //set on the input

            TeamService.getAllTeams().then(function(response) {
                if (response) {
                    $scope.teams = response.map(function(team) {
                        return {
                            position: team.position,
                            sportID: team.sportID,
                            stadiumName: team.stadiumName,
                            teamCity: team.teamCity,
                            teamID: team.teamID,
                            teamName: team.teamName
                        }
                    })
                } else {
                    AlertService.addAlert({
                        title: 'Error',
                        message: 'Something went wrong!',
                        type: 'errorAlert',
                        alertClass: 'alert-danger',
                    });
                }
            });

            $scope.searchTeam = function() {
                if ($scope.searchedTeam) {
                    var team = _.find($scope.teams, function(team) {
                        return team.teamName === $scope.searchedTeam;
                    });

                    $state.go('root.schedule', {
                        teamID: team.teamID
                    });

                } else {
                    AlertService.addAlert({
                        title: 'Warning',
                        message: 'Please select a team from the list',
                        type: 'errorAlert',
                        alertClass: 'alert-danger',
                    });
                }
            }
        }
    ]);
})();
