/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.question')
        .config(routeConfig).controller('editCompetionCtrl', editCompetionCtrl);

    function editCompetionCtrl($location,$stateParams, Question, $filter, CompetitionServices, toastr, $scope, symbolTypes, questionAnswerTypes) {


        $scope.editCompetion = {
            form: {},
            info: {
                competitionName:"",
                startDate:"",
                endDate:"",
                commonDetailsVOList:[],
                timeLimit:""
            }
        };

        CompetitionServices.getcompanydetails().then(function (response) {
            $scope.eventSubTypes = response.companydetails
        });

        var data = {
            token: $stateParams.token
        }
        CompetitionServices.getCompetitionData(data).then(function(response) {
            $scope.editCompetion.info = response.competitiondetails;
            var companyInfo = [{seq: response.competitiondetails.companySeq, name: response.competitiondetails.companyName}];
            $scope.editCompetion.info.commonDetailsVOList = companyInfo;
        });
    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('editCompetition', {
                url: '/editCompetition/:token',
                templateUrl: 'app/pages/competition/edit/edit-competition.html',
                controller: editCompetionCtrl,
                title: 'Edit Question'
            })

    }

})();
