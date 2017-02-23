/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.template', [])
        .config(routeConfig).controller('templateCtrl', templateCtrl);

    function templateCtrl($location) {

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('template', {
                url: '/template',
                controller: templateCtrl,
                templateUrl: 'app/pages/templates/template-list.html',
                title: 'Template',
                sidebarMeta: {
                    icon: 'fa fa-list-alt fa-lg',
                    order: 2,
                }
            });

    }

})();
