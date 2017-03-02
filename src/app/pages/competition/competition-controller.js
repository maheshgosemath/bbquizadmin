/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.competition', [])
        .config(routeConfig).controller('competitionCtrl', competitionCtrl);

    function competitionCtrl($scope, CompetitionServices, toastr) {

        $scope.format="yyyy-MM-dd";

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

        CompetitionServices.getcompanydetails().then(function(response) {
            $scope.eventSubTypes=response.companydetails
        });

        CompetitionServices.getList().then(function(response) {
            $scope.competitionData = response.competitionList;
        });

        $scope.addCompetition= function(isValid) {
            if(isValid) {
                var data = $scope.newCompetition.info;
                CompetitionServices.create(data).then(function(response) {
                    angular.copy({}, $scope.newCompetition.info);
                    toastr.success("Competition created successfully");
                })
            }
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
