var m = angular.module('datePickerDirective', []);

m.directive('datePicker', function () {
    return {
        restrict: 'A',
        //templateUrl: 'searchForm.html',
        controller: function ($scope) {

            $scope.today = function () {
                $scope.searchdate = new Date();

            };
            $scope.today();

            $scope.clear = function () {
                $scope.searchdate = null;
            };

            $scope.disabled = function (date, mode) {
                if ($scope.calander != null && $scope.calander.hasOwnProperty(date.toLocaleDateString("en-US"))) {
                    return false;
                }
                else {
                    return true;
                }
                true;
            };

            $scope.minDate = null;

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
        }
    };
});
