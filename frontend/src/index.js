/**
 * Application configuration
 * @author Fabien Vauchelles <fabien@vauchelles.com>
 */

(function() {
    'use strict';


    angular
        .module('myApp', [
            'ui.router',
            'ngMessages',
            'ngHolder',
            'textAngular',
            'ng-sortable'
        ])
        .config(Config);

    function Config($urlRouterProvider) {
    	
    }

})();
