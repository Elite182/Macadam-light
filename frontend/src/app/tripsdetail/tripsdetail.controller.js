/* CONTROLLER: TripsDetailController
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TripsDetailController', TripsDetailController);

    function TripsDetailController($scope, $stateParams, TripsService) {
        
        $scope.addRider = addRider;

        $scope.trip = {};
        $scope.rider = null;

    	TripsService
    		.getByID($stateParams.tripID)
    		.then(function (trip) {
    			$scope.trip = trip;
    		})
    		.catch(function () {
    			alert('404');
    		});

        ////////////

        function addRider() {
            TripsService
                .addRider($scope.trip._id, { rider: $scope.rider })
                .then(function() {
                    $scope.trip.riders.push($scope.rider);
                    $scope.rider = null;
                    $scope.addRiderForm.rider.$dirty = false;
                });
        }

    }

})();
