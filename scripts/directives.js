/**
 * Created by flammenmensch on 26.05.14.
 */
(function () {
	angular.module('ng-player.directives', [ 'ng-player.services', 'ng-player.filters' ])
		.directive('audioPlayer', [ 'audio', '$rootScope', function (audio, $scope) {
			return {
				replace     : true,
				restrict    : 'E',
				templateUrl : 'scripts/templates/audio-player.html',
				scope       : {
					source: '@'
				},
				controllerAs: 'audioCtrl',
				controller: [ '$scope', 'audio', function ($scope, audio) {
					var audioCtrl = this;

					this.playing = false;
					this.muted = false;
					this.currentTime = 0;
					this.duration = 0;
					this.progress = 0;

					var safeApply = function (fn) {
						var phase = $scope.$root.$$phase;

						if(phase === '$apply' || phase === '$digest') {
							fn();
						} else {
							$scope.$apply(fn);
						}
					};

					$scope.$on('audio.durationchange', function () {
						safeApply(function () {
							audioCtrl.duration = audio.duration();
						});
					});

					$scope.$on('audio.timeupdate', function () {
						safeApply(function () {
							audioCtrl.currentTime = audio.currentTime();
							audioCtrl.progress = audio.currentTime() / audio.duration() * 100;
						});
					});

					$scope.$on('audio.ended', function () {
						audio.pause().currentTime(0);

						safeApply(function () {
							audioCtrl.playing = false;
							audioCtrl.currentTime = 0;
						})
					});

					this.togglePlay = function () {
						audio.paused() ? audio.play() : audio.pause();

						safeApply(function () {
							audioCtrl.playing = !audio.paused();
						});
					};

					this.toggleSound = function () {
						audio.muted() ? audio.unmute() : audio.mute();

						safeApply(function () {
							audioCtrl.muted = audio.muted();
						});
					};

					audio.source($scope.source);
					audio.source($scope.source);
				} ]
			};
		} ]);
} ());