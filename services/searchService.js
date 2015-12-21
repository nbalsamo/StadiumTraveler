angular.module('Stadium').service('SearchService', ['appSettings', '$http', '$q', function(appSettings, $http, $q) {

    this.searchTeam = function(team) {
        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: appSettings.baseAPIUrl + "/search?q=" + team
            })
            .success(function(response) {
                deferred.resolve(response);
            })
            .error(function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    this.searchTeamByID = function(teamID) {
        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: appSettings.baseAPIUrl + "/search/team?id=" + teamID
            })
            .success(function(response) {
                deferred.resolve(response);
            })
            .error(function(error) {
                console.log(response);
                deferred.reject(error);
            });

        return deferred.promise;
    }
}]);
