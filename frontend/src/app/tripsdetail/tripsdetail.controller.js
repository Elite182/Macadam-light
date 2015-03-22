/* CONTROLLER: TripsDetailController
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TripsDetailController', TripsDetailController);

    function TripsDetailController($scope, $stateParams, TripsService) {
        
    	TripsService
    		.getByID($stateParams.tripID)
    		.then(function (trip) {
    			$scope.trip = trip;
    		})
    		.catch(function () {
    			alert('404');
    		});

        ////////////


    }

})();
