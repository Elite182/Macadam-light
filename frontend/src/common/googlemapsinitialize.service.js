/**
 * SERVICE: GoogleMapsInitialize
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
	'use strict';

	angular
		.module('myApp')
		.factory('GoogleMapsInitializer', GoogleMapsInitializer);

	function GoogleMapsInitializer($window, $q) {

		//Google's url for async maps initialization accepting callback function
    	var asyncUrl = 'https://maps.googleapis.com/maps/api/js?callback=';
        var mapsDefer = $q.defer();

	    //Callback function - resolving promise after maps successfully loaded
	    $window.googleMapsInitialized = mapsDefer.resolve;

	    //Async loader
	    var asyncLoad = function(asyncUrl, callbackName) {
			var script = document.createElement('script');
			script.src = asyncUrl + callbackName;
			document.body.appendChild(script);
	    };
	    //Start loading google maps
	    asyncLoad(asyncUrl, 'googleMapsInitialized');

	    //Usage: GoogleMapsInitialize.mapsInitialized.then(callback)
	    return {
	        mapsInitialized : mapsDefer.promise
	    };
	}

})();