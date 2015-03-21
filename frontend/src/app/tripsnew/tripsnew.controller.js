/**
 * CONTROLLER: TripsNewController
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TripsNewController', TripsNewController);

    function TripsNewController($scope, $state, TripsService) {
        
    	$scope.add = add;

    	$scope.trip = {
    		_id: 0,
		    title: "",
		    description: "",
		    location: "",
		    date: "",
		    time: "",
		    participants: [],
		    center: {},
		    zoom: 10,
		    markers: []
    	};

        ////////////

        function add() {
        	TripsService
        		.add($scope.trip)
        		.then(function(response) {
        			$state.go("tripsdetail", { tripID: response.data._id });
        		});
        };

    }

})();
