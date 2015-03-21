/**
 * ROUTE: trips/?page
 * @author Clément Farez <clement.frz@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .config(Routing);

    function Routing($stateProvider) {
        $stateProvider
            .state('trips', {
                url: '/trips?page',
                templateUrl: 'app/trips/trips.html',
                controller: 'TripsController'
        });
    }

})();
