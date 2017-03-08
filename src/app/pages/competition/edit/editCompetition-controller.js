/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.question')
        .config(routeConfig).controller('editCompetionCtrl', editCompetionCtrl);

    function editCompetionCtrl($location,$stateParams, Question, $filter, QuestionsData, toastr, $scope, symbolTypes, questionAnswerTypes) {


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
