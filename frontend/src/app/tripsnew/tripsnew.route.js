/**
 * ROUTE: trips/new
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .config(Routing);

    function Routing($stateProvider) {
        $stateProvider
            .state('tripsnew', {
                url: '/trips/new',
                templateUrl: 'app/tripsnew/tripsnew.html',
                controller: 'TripsNewController'
        });
    }

})();
