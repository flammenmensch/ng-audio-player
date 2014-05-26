/**
 * Created by flammenmensch on 26.05.14.
 */
(function () {
	angular.module('ng-player.services', [ ])
		.factory('audio', [ '$rootScope', function ($scope) {
			/**
			 * Wrapper for HTML5 Audio class
			 * @constructor
			 */
			var AudioService = function () {
				var audio = new Audio();

				audio.addEventListener('durationchange', function () {
					$scope.$broadcast('audio.durationchange');
				});

				audio.addEventListener('play', function () {
					$scope.$broadcast('audio.play');
				});

				audio.addEventListener('pause', function () {
					$scope.$broadcast('audio.pause');
				});

				audio.addEventListener('timeupdate', function () {
					$scope.$broadcast('audio.timeupdate');
				});

				audio.addEventListener('ended', function () {
					$scope.$broadcast('audio.ended');
				});

				/**
				 * Play current audio
				 * @returns {AudioService}
				 */
				this.play = function () {
					audio.play();

					return this;
				};
				/**
				 * Pause current audio
				 * @returns {AudioService}
				 */
				this.pause = function () {
					audio.pause();

					return this;
				};
				/**
				 * Mute sound
				 * @returns {AudioService}
				 */
				this.mute = function () {
					audio.muted = true;

					return this;
				};
				/**
				 * Unmute sound
				 * @returns {AudioService}
				 */
				this.unmute = function () {
					audio.muted = false;

					return this;
				};
				/**
				 * Get/set current audio source
				 * @param value
				 * @returns {*}
				 */
				this.source = function (value) {
					if (value === undefined) {
						return audio.currentSrc;
					}

					audio.src = value;

					return this;
				};
				/**
				 * Get/set current time in seconds
				 * @returns {Number|currentTime}
				 */
				this.currentTime = function (value) {
					if (value === undefined) {
						return audio.currentTime;
					}

					audio.currentTime = value;

					return this;
				};
				/**
				 * Get duration in seconds
				 * @returns {Number|duration}
				 */
				this.duration = function () {
					return audio.duration;
				};
				/**
				 * Return whether audio is currently paused or not
				 * @returns {boolean|paused}
				 */
				this.paused = function () {
					return audio.paused;
				};
				/**
				 * Return whether sound is currently muted or not
				 * @returns {boolean|*}
				 */
				this.muted = function () {
					return audio.muted;
				};
			};

			return new AudioService();
		} ]);
} ());