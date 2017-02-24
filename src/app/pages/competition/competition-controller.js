/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.competition', [])
        .config(routeConfig).controller('competitionCtrl', competitionCtrl);

    function competitionCtrl($scope, $location) {

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };
        $scope.popup1 = {
            opened: false
        };
        $scope.open2 = function () {
            $scope.popup2.opened = true;
        };
        $scope.popup2 = {
            opened: false
        };

        $scope.selected = {
            corporate: []
        }

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('competition', {
                url: '/competition',
                controller: competitionCtrl,
                templateUrl: 'app/pages/competition/competition-list.html',
                title: 'Competition',
                sidebarMeta: {
                    icon: 'fa fa-th-large fa-lg',
                    order: 4
                }
            });

    }

})();
