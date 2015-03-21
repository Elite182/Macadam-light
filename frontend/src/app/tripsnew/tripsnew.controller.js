/**
 * CONTROLLER: TripsNewController
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TripsNewController', TripsNewController);

    function TripsNewController($scope, TripsService) {
        
    	$scope.trip = {
    		_id: 0,
		    title: "",
		    description: "",
		    location: "",
		    date: "",
		    time: "",
		    center: { latitude: 120, longitude: 120
		    },
		    zoom: 10,
		    markers: [ { latitude: 120, longitude: 120 } ]
    	};

        ////////////



    }

})();
