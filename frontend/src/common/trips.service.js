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
            count: count,
            getByID: getByID,
            add: add,
            removeById: removeById,
            addRider: addRider
        };

        return factory;

        ////////////

        function prepareSearch(searchText) {
            var config = {
                params: {
                    
                }
            };

            if (searchText) {
                config.params = {
                    search: searchText
                };
            }

            return config;
        }

        function search(searchText, page, number) {
            var config = prepareSearch(searchText);

            if (page && number) {
                config.params.page = page;
                config.params.number = number;
            }
            
            return $http
                .get(BASE_URL, config)
                .then(function(response) {
                    return response.data;
                });
        }

        function count(searchText) {
            var config = prepareSearch(searchText);

            return $http
                .get(BASE_URL + '/count', config)
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
