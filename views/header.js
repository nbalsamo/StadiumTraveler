(function() {
    'use strict';
    angular.module('Stadium').controller('HeaderController', ['$scope', '$compile', '$state',
        function($scope, $compile, $state) {
            console.log('HeaderController');

            $scope.goHome = function() {
                $state.go('root.home', {});
            }
        }
    ]);
})();
