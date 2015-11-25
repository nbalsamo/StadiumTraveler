var m = angular.module('usMapDirective', []);

m.directive('usMap', function () {
    return {
        restrict: 'A',
        scope: {
            add: '=',
            remove: '=',
            current: '='
        },
        link: function (scope, element, attrs) {
            element.mapael({
                map: {
                    name: "usa_states",
                    zoom: {
                        enabled: true,
                        maxLevel: 20
                    }
                }
            });

            /*add markers to the map*/
            scope.$watch(function () { return scope.add; }, function (n) {
                console.log(n)
                element.trigger('update', [{}, n, [], { animDuration: 1000 }]);
                if (!jQuery.isEmptyObject(n)) {
                    scope.add = {};
                }

            }, true);

            /*remove markers from the map*/
            scope.$watch(function () { return scope.remove; }, function (n) {
                element.trigger('update', [{}, [], [n], { animDuration: 1000 }]);
                scope.remove = '';

            });

            /*watch the current marker to pan to*/
            scope.$watch(function () { return scope.current; }, function (n) {
                /*var options= {
                    level: 12, 
                    latitude: scope.current["New Jersey Devils"].latitude,
                    longitude: scope.current["New Jersey Devils"].longitude
                }
                element.trigger('zoom', options);
                console.log("its coming");
                console.log(scope.current);*/
            });
        }
    };
});