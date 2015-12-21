angular.module('Stadium').service('ScheduleService', ['appSettings', '$http', '$q', function(appSettings, $http, $q) {

    /*var service = {};

    service.markers = [];

    service.getPlotObject = function (title) {
        var plotObject = {};
        plotObject[title] = {
            type: 'image',
            url: 'images/nhl/devil2.png',
            width: 45,
            height: 50,
            latitude: stadiums[title].position.lat,
            longitude: stadiums[title].position.lng,
            text: { content: "" },
            tooltip: { content: "Limoge" }
        }

        return plotObject;
    }

    service.getScheduleObject = function (title, date) {
        var schedule = [];
        angular.forEach(stadiums[title].schedule, function (game) {
            if (game.home) {
                var gameMonth = new Date(game.date).getMonth();
                if (parseInt(gameMonth) === parseInt(date)) {
                    schedule.push(game);
                }
            }
        });
        return schedule;
    }

    service.getSurroundingGames = function (game) {
        return surroundingGames;
    }*/

    this.getSchedule = function(id) {
        var deferred = $q.defer();
        $http({
                method: 'GET',
                url: appSettings.baseAPIUrl + "/schedules?teamID=" + id
            })
            .success(function(response) {
                deferred.resolve(response);
            })
            .error(function(error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    this.getSurroundingSchedule = function(teamID, searchDate) {
        var deferred = $q.defer();
        $http({
                method: 'POST',
                url: appSettings.baseAPIUrl + "/schedules/surroundingSchedule",
                data: {
                    "teamID": teamID,
                    "date": searchDate
                }
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
