(function() {
    'use strict';
    angular.module('Stadium').controller('HomeController', ['$scope', '$compile', '$state', 'SearchService',
        function($scope, $compile, $state, SearchService) {
            $scope.searchedTeam; //set on the input

            SearchService.getAllTeams().then(function(response) {
                if (response) {
                    $scope.teams = response;
                } else {
                    console.log('Error getting master list of teams');
                }
            });

            $scope.searchTeam = function() {
                SearchService.searchTeam($scope.searchedTeam).then(function(response) {
                    if (response) {
                        $state.go('form', {
                            teamID: response.teamID
                        });
                    } else {
                        alert($scope.searchedTeam + ' not found!');
                    }
                });
            }
        }
    ]);
})();
