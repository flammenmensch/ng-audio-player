/**
 * Created by flammenmensch on 27.05.14.
 */
(function () {
	angular.module('ng-player.filters', [ ])
		.filter('time', function () {
			return function (input) {
				var minutes = Math.floor(input / 60).toString();
				var seconds = Math.floor(input % 60).toString();

				if (minutes.length === 1) {
					minutes = '0' + minutes;
				}

				if (seconds.length === 1) {
					seconds = '0' + seconds;
				}

				return minutes + ':' + seconds;
			};
		});
} ());