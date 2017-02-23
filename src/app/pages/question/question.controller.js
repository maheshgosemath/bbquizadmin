/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.question', [])
        .config(routeConfig).controller('questionCtrl', questionCtrl);

    function questionCtrl($scope,$location) {
        $scope.questionPageSize=10;

        $scope.gotoCreateQuestion = function () {
            $location.path("/createQuestion");
        };
    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('question', {
                url: '/question',
                controller: questionCtrl,
                templateUrl: 'app/pages/question/question-list.html',
                title: 'Question',
                sidebarMeta: {
                    icon: 'fa fa-question fa-lg',
                    order: 1,
                }
            })
            .state('createQuestion', {
                url: '/createQuestion',
                templateUrl: 'app/pages/question/create-question.html',
                controller: questionCtrl,
                title: 'CREATE QUESTION'
            })

    }

})();
