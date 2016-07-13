var m = angular.module('scheduleListDirective', []);

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

m.directive('scheduleList', function() {
    return {
        restrict: "E",
        templateUrl: "./shared/scheduleList.template.html",
        scope: {
            games: '=',
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
