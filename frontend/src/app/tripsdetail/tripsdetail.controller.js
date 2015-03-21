/**
 * CONTROLLER: TripsDetailController
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TripsDetailController', TripsDetailController);

    function TripsDetailController($scope, TripsService) {
        
    	$scope.trip = {
	        _id: 0,
	        title: "JCC",
	        description: "A JCC production !",
	        location: "Ile-de-France",
	        date: "2015-03-20",
	        time: "15:00",
	        participants: [
	            "julien",
	            "clément F",
	            "cédric",
	            "clément N"
	        ],
	        center: {
	            latitude: 120,
	            longitude: 120
	        },
	        zoom: 10,
	        markers: [
	            {
	                latitude: 120,
	                longitude: 120
	            }
	        ]
    	};

        ////////////



    }

})();
