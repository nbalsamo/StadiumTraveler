var m = angular.module('calendarDirective', []);

m.directive('calendar', function() {
    return {
        restrict: "E",
        templateUrl: "./shared/calendar.template.html",
        scope: {
            validDates: "=",
            onSelect: "=",
            selected: "="
        },
        link: function(scope) {
            scope.selected = scope.selected ? scope.selected : removeTime(moment());
            scope.month = scope.selected.clone();

            var start = lastSundayOfLastMonth(scope.selected);
            _buildMonth(scope, start, scope.month);

            scope.select = function(day) {
                if (!day.isDisabled) {
                    scope.selected = day.date;
                    scope.onSelect(scope.selected);
                }
            };

            scope.nextMonth = function() {
                var next = scope.month.clone();
                setToSunday(next.month(next.month() + 1).date(1));
                scope.month.month(scope.month.month() + 1);
                _buildMonth(scope, next, scope.month);
            };

            scope.previousMonth = function() {
                var previous = scope.month.clone();
                setToSunday(previous.month(previous.month() - 1).date(1));
                scope.month.month(scope.month.month() - 1);
                _buildMonth(scope, previous, scope.month);
            };
        }
    };

    function removeTime(date) {
        return date.hour(0).minute(0).second(0).millisecond(0);
    }

    function setToSunday(date) {
        return removeTime(date.day(0));
    }

    function lastSundayOfLastMonth(date) {
        var start = date.clone(); //clone the selected for the first of the month
        start.date(1); //set the date to the first
        removeTime(setToSunday(start)); //set the start to sunday.  This will get the last sunday of the previous month
        return start;
    }

    function _buildMonth(scope, startDate, month) {
        scope.weeks = [];
        var done = false;
        var currentDate = startDate.clone();
        var monthIndex = startDate.month();
        var count = 0;

        while (!done) {
            scope.weeks.push({
                days: _buildWeek(currentDate, month, scope.validDates)
            });
            currentDate.add(1, "w");
            done = count++ > 2 && monthIndex !== currentDate.month();
            monthIndex = currentDate.month();
        }
    }

    function _buildWeek(startDate, month, validDates) {
        var days = [];
        var currentDate = startDate.clone();
        for (var i = 0; i < 7; i++) {
            days.push({
                name: currentDate.format("dd").substring(0, 1),
                number: currentDate.date(),
                isCurrentMonth: currentDate.month() === month.month(),
                isToday: currentDate.isSame(new Date(), "day"),
                date: currentDate,
                isDisabled: !validDates.hasOwnProperty(buildDateFormat(currentDate))
            });
            currentDate = currentDate.clone();
            currentDate.add(1, "d");
        }
        return days;
    }

    function buildDateFormat(date) {
        var stringDate = date.format('M') + '/' + date.date() + '/' + date.format('YYYY');
        return stringDate;
    }
});
