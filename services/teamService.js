angular.module('Stadium').service('TeamService', ['appSettings', '$http', '$q', function(appSettings, $http, $q) {

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
                deferred.reject(error);
            });

        return deferred.promise;
    }

    this.getAllTeams = function() {
        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: appSettings.baseAPIUrl + "/teams"
            })
            .success(function(response) {
                deferred.resolve(response);
            })
            .error(function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    this.getTeamSchedule = function(teamID) {
        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: appSettings.baseAPIUrl + '/teams/' + teamID + '/schedule'
            })
            .success(function(response) {
                deferred.resolve(response);
            })
            .error(function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }
}]);
