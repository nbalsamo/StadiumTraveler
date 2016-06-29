(function() {
    'use strict';
    angular.module('Stadium').controller('ScheduleListController', ['$scope', '$compile', '$state', 'TeamService', 'ScheduleService',
        function($scope, $compile, $state, TeamService, ScheduleService) {
            var teamID = $state.params.teamID;

            TeamService.getTeamSchedule(teamID).then(function(response) {
                if (response) {
                    console.log(response);
                    $scope.schedule = response;
                } else {
                    AlertService.addAlert({
                        title: 'Error',
                        message: 'Something went wrong!',
                        type: 'errorAlert', // this has to match the alert-type attribute
                        alertClass: 'alert-danger', //the alert element will have this class, good for css styling
                    });
                }
            });

        }
    ]);
})();
