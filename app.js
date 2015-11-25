(function(){
    'use strict';
    //var app = angular.module('Stadium', ['ui.bootstrap', 'usMapDirective', 'datePickerDirective', 'SearchService']);


    /*This doesnt do anything anymore. Just a place holder so i remember what i actually worked on*/
    angular.module('Stadium').controller('MapController', ['$scope', '$compile', 'ScheduleService', 'SearchService', function ($scope, $compile, ScheduleService, SearchService) {
        $scope.markers = []; //master list of markers
		$scope.markerToAdd = {}; //marker plot object to add
		$scope.markerToDelete = ""; //marker title to delete. 
		$scope.currentMarker = {}; //currently selected marker
		$scope.surroundingSchedule = null;

		/*FORM STUFF*/
		$scope.calander;
		$scope.searchdate;
		$scope.team;
		$scope.showTeamSearch = true;

        //not being used
        $scope.addMarker = function(marker){
			marker.plotObject = MapService.getPlotObject(marker.title);
			$scope.markerToAdd = marker.plotObject;
			$scope.markers.push(marker);
		};

        //not being used
		$scope.removeMarker = function(index){
			$scope.markerToDelete = $scope.markers[index].title;
			$scope.markers.splice(index, 1);
		};

		$scope.getSchedule = function(month){
			$scope.$apply(function () {
			    $scope.markers[0].schedule = ScheduleService.getScheduleObject($scope.markers[0].title, month);
        	});
		};

        //not being used
		$scope.panTo = function(team){
			var plotObject = {};
			plotObject[team.title] = {
				type : 'image',
				url: 'images/nhl/devil2.png',
				width: 45,
				height: 50,
				latitude : team.position.lat,
				longitude : team.position.lng,
				text : {content : ""},
				tooltip : {content : "Limoge"}
			}
			$scope.markerToAdd = plotObject;
			$scope.currentMarker = plotObject;
		};

        /*Actually submit the form to search for surrounding games*/
		$scope.search = function () {
		    //console.log($scope.team);
		    //console.log($scope.searchdate);
		    var date = new Date($scope.searchdate);
		    ScheduleService.getSurroundingSchedule($scope.team, date.toDateString()).then(function(response){
		        $scope.surroundingSchedule = response.Data;
		    });
		    console.log('below is the team list');
		    console.log($scope.surroundingSchedule);
		}

        /*Clear the website's form*/
		$scope.clearForm = function(){; 
			$('#searchForm').remove();
			$scope.showTeamSearch = true;
			$scope.team = null;
			$scope.surroundingSchedule = null;
		}

        /*Search a team name and populate the calendar*/
		$scope.searchTeam = function (team) {
		    SearchService.searchTeam(team).then(function (response) {
		        if (response.Data.TeamID != null) {
		            $scope.team = response.Data;
		            ScheduleService.getSchedule(response.Data.TeamID).then(function (response) {
		                $scope.calander = response.Data;
		                $scope.showTeamSearch = false;
		                var searchFrom = $compile('<search-form id="searchForm"/>')($scope);
		                $('#appendHere').append(searchFrom);
		            });
		        }
		        else {
		            alert(team + ' not found!');
		        }
		    });
		}
	}]);

})();
