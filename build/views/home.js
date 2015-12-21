(function() {
    'use strict';
    angular.module('Stadium').controller('HomeController', ['$scope', '$compile', '$state', 'SearchService',
        function($scope, $compile, $state, SearchService) {
            $scope.team; //set on the input

            $scope.searchTeam = function() {
                SearchService.searchTeam($scope.team).then(function(response) {
                    if (response) {
                        $state.go('form', {
                            teamID: response.teamID
                        });
                    } else {
                        alert($scope.team + ' not found!');
                    }
                });
            }
        }
    ]);
})();
