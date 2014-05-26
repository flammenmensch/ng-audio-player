/**
 * Created by flammenmensch on 26.05.14.
 */
(function () {
	angular.module('ng-player.services', [ ])
		.factory('audio', [ function () {
			/**
			 * Wrapper for HTML5 Audio class
			 * @constructor
			 */
			var AudioService = function () {
				var audio = new Audio();
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
				 * Get current time in seconds
				 * @returns {Number|currentTime}
				 */
				this.currentTime = function () {
					return audio.currentTime;
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