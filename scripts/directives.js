/**
 * Created by flammenmensch on 26.05.14.
 */
(function () {
	angular.module('ng-player.directives', [ 'ng-player.services' ])
		.directive('audioPlayer', [ '$timeout', 'audio', function ($timeout, audio) {
			return {
				replace     : true,
				restrict    : 'E',
				templateUrl : 'scripts/templates/audio-player.html',
				scope       : {
					source: '@'
				},
				link: function (scope, element, attributes) {
					var children = element.children();

					var playButton      = angular.element(children[0]);
					var scrubBar		= angular.element(children[1])
					var muteButton      = angular.element(children[2]);

					var playing = false;
					var mute = false;

					var togglePlay = function () {
						playing = !playing;
						playButton
							.removeClass('play')
							.removeClass('pause')
							.addClass(playing ? 'pause' : 'play');

						if (playing) {
							audio.play();
							updateCurrentTime();
						} else {
							audio.pause();
						}
					};

					var toggleSound = function () {
						mute = !mute;
						muteButton
							.removeClass('mute')
							.removeClass('unmute')
							.addClass(mute ? 'unmute' : 'mute');

						if (mute) {
							audio.mute();
						} else {
							audio.unmute();
						}
					};

					var updateCurrentTime = function () {
						var percent = Math.floor(audio.currentTime() / audio.duration() * 100);

						if (!isNaN(percent)) {
							scrubBar.val(percent);
						}

						if (!audio.paused()) {
							$timeout(updateCurrentTime, 500);
						}
					};

					playButton.on('click', function () {
						togglePlay();
					});

					muteButton.on('click', function () {
						toggleSound();
					});

					scope.$watch('source', function (newValue, oldValue) {
						if (newValue) {
							audio.source(newValue);
						}

						updateCurrentTime();
					});
				}
			};
		} ]);
} ());