(function() {
    'use strict';
    angular.module('Stadium').controller('HomeController', ['$scope', '$compile', '$state', 'SearchService', 'ScheduleService', 'AlertService',
        function($scope, $compile, $state, SearchService, ScheduleService, AlertService) {
            $scope.searchedTeam; //set on the input
            $scope.teamID = null;
            $scope.calendar = {};
            $scope.showCalendar = false;

            SearchService.getAllTeams().then(function(response) {
                if (response) {
                    $scope.teams = response;
                } else {
                    AlertService.addAlert({
                        title: 'Error',
                        message: 'Something went wrong!',
                        type: 'errorAlert', // this has to match the alert-type attribute
                        alertClass: 'alert-danger', //the alert element will have this class, good for css styling
                    });
                }
            });

            $scope.searchTeam = function() {
                SearchService.searchTeam($scope.searchedTeam).then(function(response) {
                    if (response) {
                        $scope.teamID = response.teamID;
                        getSchedule();
                    } else {
                        AlertService.addAlert({
                            title: 'Error',
                            message: '"' + $scope.searchedTeam + '"' + ' not found!',
                            type: 'errorAlert', // this has to match the alert-type attribute
                            alertClass: 'alert-danger', //the alert element will have this class, good for css styling
                        });
                    }
                });
            }

            var getSchedule = function() {
                ScheduleService.getSchedule($scope.teamID).then(function(response) {
                    $scope.calendar = response;
                    $scope.$broadcast('refreshDatepickers') //A bit of hack to get the datepicker re-populate dates
                }, function(err) {
                    console.log('Error: ' + err);
                })
            }
        }
    ]);
})();
