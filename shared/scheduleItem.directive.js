var m = angular.module('scheduleItemDirective', []);

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
            scope.game.dayOfWeek = moment(scope.game.date).format('ddd');
            scope.game.date = moment(scope.game.date).format('MM/DD/YYYY')

            scope.goToMap = function() {
                console.log('insert map stuff');
            }

        }
    };
});
