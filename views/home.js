(function() {
    'use strict';
    angular.module('Stadium').controller('HomeController', ['$scope', '$compile', '$state', 'SearchService', 'ScheduleService',
        function($scope, $compile, $state, SearchService, ScheduleService) {
            $scope.searchedTeam; //set on the input
            $scope.teamID = null;


            SearchService.getAllTeams().then(function(response) {
                if (response) {
                    $scope.teams = response;
                } else {
                    console.log('Error getting master list of teams');
                }
            });

            $scope.searchTeam = function() {
                SearchService.searchTeam($scope.searchedTeam).then(function(response) {
                    /*if (response) {
                        $state.go('form', {
                            teamID: response.teamID
                        });
                    } */
                    if (response) {
                        $scope.teamID = response.teamID;
                        getSchedule();
                    } else {
                        alert($scope.searchedTeam + ' not found!');
                    }
                });
            }

            $scope.clearDate = function() {
                /* clear the calendar when the input team changes */
                $scope.calendar = null;
                $scope.searchDate = null;
                $scope.$broadcast('refreshDatepickers') //A bit of hack to get the datepicker re-populate dates
            }

            var getSchedule = function() {
                $scope.clearDate();
                ScheduleService.getSchedule($scope.teamID).then(function(response) {
                    $scope.calendar = response;
                    $scope.$broadcast('refreshDatepickers') //A bit of hack to get the datepicker re-populate dates
                }, function(err) {
                    console.log('Error: ' + err); //TODO - needs an error handler
                })
            }
        }
    ]);
})();
