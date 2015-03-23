/* DIRECTIVE: GoogleMaps
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

 (function() {
 	'use strict';

 	angular
 		.module("myApp")
 		.directive("googleMaps", GoogleMaps);

	function GoogleMaps(GoogleMapsInitializer) {

		return {
			restrict: 'E',
			scope: {
				markers: "=",
				center: "=",
				zoom: "=",
				editable: "@"
			},
			templateUrl: '/common/googlemapsdirective.html',
			link: linkFunc
		};

		///////

		function linkFunc(scope, element, attr) {

			var map;
			var directionsDisplay;
			var directionsService;
			var abort = false;

			GoogleMapsInitializer.mapsInitialized.then(function() {

	            if (scope.center == null) {
	            	scope.center = { latitude: 48.7707452, longitude: 2.0803735 };
	            }
	            if (scope.zoom == null) {
					scope.zoom = 10;
	            }

	            var editable = (scope.editable == "true");

				directionsDisplay = new google.maps.DirectionsRenderer({
	                draggable: editable
	            });

				directionsService = new google.maps.DirectionsService();

	            map = new google.maps.Map(element.children('#google-maps')[0], {
	                zoom: scope.zoom,
	                center: normalizeToLatLng(scope.center)
	            });

	            directionsDisplay.setMap(map);

	            google.maps.event.addListener(map, 'center_changed', updateCenter);
	            google.maps.event.addListener(map, 'zoom_changed', updateZoom);

	            if (editable) {
	            	google.maps.event.addListener(map, 'click', placeMarker);
		            google.maps.event.addListener(directionsDisplay, 'directions_changed', updateMarkers);
	            }

	            scope.$watchCollection('markers', function() {
	            	if (abort) {
	            		abort = false;
	            	} else {
	            		refreshDirections();
	            	}
	            });
	        });

			/**
			 * Response to a click event, add a new waypoint
			 */
	        function placeMarker(e) {
	        	if (scope.markers.length < 10) {
	        		scope.$apply(function() {
	                	scope.markers.push({ location: normalizeFromLatLng(e.latLng) });
	                });
	        	}	
	        }

	        /**
	         * Response to a drag n drop event, update markers' position
	         */
	        function updateMarkers() {
	        	var myroute = directionsDisplay.getDirections().routes[0];

	        	var newMarkers = [];

                newMarkers = [{
                	label: myroute.legs[0].start_address,
                	location: normalizeFromLatLng(myroute.legs[0].start_location)
                }];

                for (var i = 0; i < myroute.legs.length; i++) {
                    newMarkers.push({
                    	label: myroute.legs[i].end_address,
                    	location: normalizeFromLatLng(myroute.legs[i].end_location)
                    });
                }

                scope.$apply(function() {
                	abort = true;
                	scope.markers = newMarkers;
                });
	        }

	        /**
	         * Response to a center changed event, update center coordinates 
	         */
	        function updateCenter() {
	        	scope.$apply(function() {
	        		scope.center = normalizeFromLatLng(map.getCenter());
	        	});
	        }

	        /**
	         * Response to a zoom changed event, update zoom level
	         */
	        function updateZoom() {
	        	scope.$apply(function() {
	        		scope.zoom = map.getZoom();
	        	});
	        }

	        /**
	         * Force direction service to calculate a new route
	         */
	        function refreshDirections() {
	        	if (scope.markers.length >= 2) {
	        		var start = normalizeToLatLng(scope.markers[0].location);
	                var end = normalizeToLatLng(scope.markers[scope.markers.length-1].location);

	                var wp = [];
	                for (var i = 1; i < scope.markers.length-1; i++) {
	                    wp.push({ location: normalizeToLatLng(scope.markers[i].location) });
	                }

	                var request = {
	                    origin: start,
	                    destination: end,
	                    travelMode: google.maps.TravelMode.DRIVING
	                };

	                if (wp.length > 0) {
	                	request.waypoints = wp;
	                }

	                directionsService.route(request, function (response, status) {
	                    if (status == google.maps.DirectionsStatus.OK) {
	                        directionsDisplay.setDirections(response);
	                    }
	                });
	        	}
            }

            /**
             * Helper to create a LatLng from a marker's location
             */
            function normalizeToLatLng(marker) {
            	return new google.maps.LatLng(
                	marker.latitude,
                	marker.longitude);
            }

            /**
             * Halper to create a marker location from a LatLng
             */
            function normalizeFromLatLng(latLng) {
            	return {
            		latitude: latLng.lat(),
            		longitude: latLng.lng()};
            }

            /**
             * Get user location using geolocation browser's API
             */
	        function geoLocate() {
				if (navigator.geolocation) {
	                navigator.geolocation.getCurrentPosition(function (position) {
	                    var pos = normalizeToLatLng(position.coords);

	                    map.setCenter(pos);
	                }, function () {
	                    handleNoGeolocation(true);
	                });
	            } else {
	                handleNoGeolocation(false);
	            }
			}

			/**
			 * Display an error message if geolocation failed
			 */
			function handleNoGeolocation(errorFlag) {
	            if (errorFlag) {
	                var content = 'Error: The Geolocation service failed.';
	            } else {
	                var content = 'Error: Your browser doesn\'t support geolocation.';
	            }

	            alert(content);
	        }
		}
	}

 })();