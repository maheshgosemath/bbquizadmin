/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.competition', [])
        .config(routeConfig).controller('competitionCtrl', competitionCtrl);

    function competitionCtrl($scope, CompetitionServices, $location, toastr) {

        $scope.format = "yyyy-MM-dd";
        $scope.competitionPageSize = 10;


        $scope.gotoCreateCompetition = function () {
            $location.path("/createCompetition");
        };
        $scope.editCompetitionData = function (item) {
            $location.path("editCompetition/" + item.token);
        };

        $scope.addRow = function (index) {
            var domain = {domainName: ""};
            if ($scope.newCompetition.info.domain.length <= index + 1) {
                $scope.newCompetition.info.domain.splice(index + 1, 0, domain);
            }
        };

        $scope.newCompetition={
            form:{},
            info:{
                competitionName:"",
                startDate:"",
                endDate:"",
                commonDetailsVOList:[],
                timeLimit:"",
                domain:[{
                    domainName:""
                }]
            }
        };


        $scope.deleteRow = function ($event, index) {
            if ($event.which == 1)
                $scope.newCompetition.info.domain.splice(index, 1);
        };
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
        };

        CompetitionServices.getcompanydetails().then(function (response) {
            $scope.eventSubTypes = response.companydetails
        });

        getCompetitionsList();
        function getCompetitionsList() {
            CompetitionServices.getList().then(function (response) {
                $scope.competitionMasterData = response.competitionList;
                $scope.competitionData = [].concat($scope.competitionMasterData);
            });
        }

        $scope.addCompetition = function (isValid) {
            if (isValid) {
                var data = $scope.newCompetition.info;
                CompetitionServices.create(data).then(function (response) {
                   // angular.copy({}, $scope.newCompetition.info);
                    $scope.newCompetition.form.$setPristine();
                    $scope.newCompetition.info = "";
                    $location.path("/competition");
                    getCompetitionsList();
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
            })
            .state('createCompetition', {
                url: '/createCompetition',
                templateUrl: 'app/pages/competition/create-competition.html',
                controller: competitionCtrl,
                title: 'CREATE COMPETITION'
            })

    }

})();
