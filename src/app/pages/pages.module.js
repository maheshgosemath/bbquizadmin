/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages', [
        'ui.router',

        'UApps.pages.dashboard',
        'UApps.pages.question',
        //'UApps.pages.templates',
        'UApps.pages.corporate',
        'UApps.pages.competition'



    ])
        .config(routeConfig).run(['$rootScope', '$location', 'AuthenticationService',
        function ($rootScope, $location, AuthenticationService) {
            // keep user logged in after page refresh

            //Read authentication from cookies
            AuthenticationService.init();

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                setPageLocation();
            });
            setPageLocation();

            function setPageLocation() {
                if (AuthenticationService.authenticate()) {
                    if ($location.path() == '/login')
                        $location.path('/');
                } else {
                    // redirect to login page if not logged in
                    if ($location.path() !== '/login')
                        $location.path('/login');
                }
            }

        }]);

    /** @ngInject */
    function routeConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');
    }


})();
