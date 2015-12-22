var m = angular.module('datePickerDirective', []);

m.directive('datePicker', function() {
    return {
        restrict: 'A',
        //templateUrl: 'searchForm.html',
        controller: function($scope) {

            $scope.today = function() {
                $scope.searchDate = new Date('3/29/15');
            };

            $scope.today();

            $scope.clear = function() {
                $scope.searchDate = null;
            };

            $scope.disabled = function(date, mode) {
                if ($scope.calendar != null && $scope.calendar.hasOwnProperty(date.toLocaleDateString("en-US"))) {
                    return false;
                } else {
                    return true;
                }
                return true;
            };

            $scope.minDate = null;

            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                if (!$scope.calendar) {
                    alert('Please search to populate available dates!');
                } else {
                    $scope.opened = true;
                }
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            //possible formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = 'dd-MMMM-yyyy';
        }
    };
});
