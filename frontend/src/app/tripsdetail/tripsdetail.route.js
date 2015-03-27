/**
 * ROUTE: trips/{id:int}
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .config(Routing);

    function Routing($stateProvider) {
        $stateProvider
            .state('tripsdetail', {
                url: '/trips/{tripID}',
                templateUrl: 'app/tripsdetail/tripsdetail.html',
                controller: 'TripsDetailController'
            });
    }

})();
