(function() {
    'use strict';
    angular.module('Stadium').controller('FormController', ['$scope', '$compile', '$state', 'SearchService', 'ScheduleService',
        function($scope, $compile, $state, SearchService, ScheduleService) {

            $scope.teamID = $state.params.teamID;

            ScheduleService.getSchedule($scope.teamID).then(function(response) {
                $scope.calander = response;
            }, function(err) {
                console.log('Error: ' + err); //TODO - needs an error handler
            });

            SearchService.searchTeamByID($scope.teamID).then(function(response) {
                $scope.teamName = response.teamName;
            }, function(err) {
                console.log('Error: ' + err); //TODO - needs an error handler
            });

            /*return to the home screen*/
            $scope.goHome = function() {
                $state.go('home');
            }

            /*search for the surrounding games*/
            $scope.search = function() {
                $state.go('surrounding', {
                    team: $scope.teamID,
                    date: $scope.searchdate
                });
            }
        }
    ]);
})();
