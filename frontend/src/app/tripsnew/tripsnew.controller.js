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
        $scope.enoughMarkers = enoughMarkers;

    	$scope.trip = {
		    title: "",
		    description: "",
		    location: "",
		    date: "",
		    time: "",
		    riders: [],
		    center: null,
		    zoom: null,
		    markers: []
    	};

        ////////////

        function add() {
        	TripsService
        		.add($scope.trip)
        		.then(function(response) {
        			$state.go("tripsdetail", { tripID: response.data._id });
        		});
        }

        function enoughMarkers() {
            return ($scope.trip.markers.length > 1);
        }
    }

})();
