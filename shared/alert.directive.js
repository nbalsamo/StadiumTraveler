/*this probably shouldnt be in the shared folder as it is linked to the stadium module */
angular.module('Stadium').directive('customAlerts', function(AlertService) {
    return {
        scope: {
            alertType: '@?',
        },
        template: '<div ng-repeat="alert in alertSrvs.getAlerts()" >   <div ng-show="!alertType || alertType===alert.type" class="alert " ng-class="alert.alertClass" role="alert">     <strong>{{alert.title}}</strong> {{alert.message}}     <button  type="button" class="close"  ng-click="alertSrvs.removeAlert(alert);">       <span >&times;</span>     </button>   </div> </div>',
        restrict: 'EA',
        link: function(scope, element, attrs) {
            scope.alertSrvs = AlertService;
        }
    };
});
