/**
 * SERVICE: TripsService
 * @author Cédric BouletKessler <cedric.bouletkessler@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('TripsService', TripsService);

    function TripsService($http) {
        var BASE_URL = 'http://localhost:9000/trips';

        var factory = {
            search: search,
            getByID: getByID,
            add: add,
            removeById: removeById,
            addRider: addRider
        };

        return factory;

        ////////////

        function search(searchText) {
            var config;

            if (searchText) {
                config = {
                    params: {
                        search: searchText
                    }
                };
            } else {
                config = {};
            }

            return $http
                .get(BASE_URL, config)
                .then(function(response) {
                    return response.data;
                });
        }

        function getByID(tripID) {
            return $http
                .get(BASE_URL + '/' + tripID)
                .then(function (response) {
                    return response.data;
                });
        }

        function add(newtrip) {
            return $http.post(BASE_URL, newtrip);
        }

        function removeById(_id) {
            return $http.delete(BASE_URL + '/' + _id);
        }

        function addRider(_id, rider) {
            return $http.post(BASE_URL + '/' + _id + '/riders', rider);
        }
    }

})();
