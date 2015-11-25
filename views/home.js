(function () {
    'use strict';
    angular.module('Stadium').controller('HomeController', ['$scope', '$compile', '$state', 'SearchService', 'ScheduleService',
                                                   function ($scope, $compile, $state, SearchService, ScheduleService) {
        $scope.team;

        /*IDK what this does anymore to be completly honest*/
        $scope.getSchedule = function (month) {
            $scope.$apply(function () {
                $scope.markers[0].schedule = ScheduleService.getScheduleObject($scope.markers[0].title, month);
            });
        };

        /*Search a team name and populate the calendar*/
        $scope.searchTeam = function (team) {
            SearchService.searchTeam(team).then(function (response) {
                if (response.Data.TeamID != null) {
                    $state.go('form', {
                        team: response.Data.TeamID
                    });
                }
                else {
                    alert(team + ' not found!');
                }
            });
        }
      }
    ]);
})();