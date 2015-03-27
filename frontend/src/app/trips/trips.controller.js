/**
 * CONTROLLER: TripsController
 * @author Clément Farez <clement.frz@gmail.com>
 */

(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('TripsController', TripsController);

    function TripsController($scope, $stateParams, TripsService) {
        $scope.search = search;
        $scope.changePage = changePage;

        $scope.searchTrip = '';
        $scope.pages = [];

        ////////////

        var numberPerPage = 4;
        if ($stateParams.page) {
            $scope.page = $stateParams.page;
        } else {
            $scope.page = 1;
        }

        search();

		function search() {
            TripsService
                .search($scope.searchTrip, $scope.page, numberPerPage)
                .then(function(trips) {
                    $scope.trips = trips;
                });

            TripsService
                .count($scope.searchTrip)
                .then(function(count) {
                    $scope.pages = range(1, Math.ceil(count/numberPerPage));
                });
        }

        function changePage(pageNumber) {
            if (1 <= pageNumber  && pageNumber <= $scope.pages.length) {
                $scope.page = pageNumber;
                search();
            }
        }
 
        function range(min, max) {
            var step = [];

            for (var i = min; i <= max; i++) {
                step.push(i);
            }

            return step;
        }
    }

})();
