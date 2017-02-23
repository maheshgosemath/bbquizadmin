/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.corporate', [])
        .config(routeConfig).controller('corporateCtrl', corporateCtrl);

    function corporateCtrl($location) {

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('corporate', {
                url: '/corporate',
                controller: corporateCtrl,
                templateUrl: 'app/pages/corporate/corporate-list.html',
                title: 'Corporate',
                sidebarMeta: {
                    icon: 'fa fa-briefcase fa-lg',
                    order: 3,
                }
            });

    }

})();
