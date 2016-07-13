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

    //filter 1- home 2- away 
    this.getTeamSchedule = function(teamID, filter) {
        var deferred = $q.defer();

        var filterQueryString = filter ? '?filter=' + filter : '';

        $http({
                method: 'GET',
                url: appSettings.baseAPIUrl + '/teams/' + teamID + '/schedule' + filterQueryString
            })
            .success(function(response) {
                deferred.resolve(response);
            })
            .error(function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    this.getSurroundingSchedule = function(teamID, date, distance) {
        var deferred = $q.defer();

        $http({
                method: 'GET',
                url: appSettings.baseAPIUrl + '/teams/' + teamID + '/surrounding?date=' + date + '&distance=' + distance
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
