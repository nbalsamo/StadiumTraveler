var m = angular.module('scheduleItemDirective', []);

m.filter('dayFormat', function() {
    return function(input) {
        return moment(input).format('ddd');
    }
});

m.filter('dateFormat', function() {
    return function(input) {
        return moment(input).format('MM/DD/YYYY')
    }
});

m.directive('scheduleItem', function() {
    return {
        restrict: "E",
        templateUrl: "./shared/scheduleItem.template.html",
        scope: {
            game: '=',
            action: '='
        },
        link: function(scope) {
            /*game = {
                date, 
                time, 
                homeTeam,
                awayTeam 
                isHome
            }*/

            scope.goToMap = function() {
                console.log('insert map stuff');
            }

        }
    };
});
