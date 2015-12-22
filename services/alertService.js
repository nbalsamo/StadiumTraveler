angular.module('Stadium').factory('AlertService', function($rootScope) {
    var alerts = [];

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
        alerts = []; //Clears all alerts when route is changed
    });

    // Public API here
    return {
        getAlerts: function() {
            return alerts;
        },
        addAlert: function(alertData) {
            alerts.push(alertData);
        },
        removeAlert: function(alert) {
            var index = alerts.indexOf(alert);
            alerts.splice(index, 1)
        },
        clearAllAlerts: function() {
            alerts = [];
        },
    };
});
