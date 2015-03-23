/**
 * CONTROLLER: TripsController
 * @author Clément Farez <clement.frz@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TripsController', TripsController);

    function TripsController($scope, TripsService) {
        
		search();

        ////////////

		function search() {
            TripsService
                .search($scope.searchTrip)
                .then(function(trips) {
                    $scope.trips = trips;
                });
        }

    }

})();
