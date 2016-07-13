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

m.filter('distanceColor', function() {
    return (function(distance, maxDistance) {
        if (distance <= parseInt(maxDistance, 10) * .5) {
            return 'closeDistance'
        }
        if (distance <= parseInt(maxDistance, 10) * .75) {
            return 'mediumDistance'
        } else {
            return 'farDistance'
        }
    })
})

m.directive('scheduleList', function() {
    return {
        restrict: "E",
        templateUrl: "./shared/scheduleList.template.html",
        scope: {
            games: '=',
            action: '=',
            maxDist: '='
        },
        link: function(scope) {
            console.log(scope);

            scope.goToMap = function() {
                console.log('insert map stuff');
            }

        }
    };
});
