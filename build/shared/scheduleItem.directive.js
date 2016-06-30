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
                opponent, 
                isHome
            }*/
            scope.game.dayOfWeek = moment(scope.game.date).format('ddd');

        }
    };
});