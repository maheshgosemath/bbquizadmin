/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.question')
        .config(routeConfig).controller('editQuestionCtrl', editQuestionCtrl);

    function editQuestionCtrl($location, binarySelectSymbolTypes,singleSelectSymbolTypes,symbolTypes2, $stateParams, Question, $filter, QuestionsData, toastr, $scope, symbolTypes, questionAnswerTypes) {

        $scope.questionListsData = $scope.questionListsMasterData = QuestionsData.getList();

        //$scope.questionInfo = QuestionsData.getRowById($stateParams.questionId);


        $scope.editQuestion = {
            form: {},
            info: {
                id: "",
                questionDesc: "",
                questionType: "",
                parentAnswerId: "",
                parentQuestionId: "",
                answerSymbol: "",
                answerOption: [],
                threshold : ""
            },

        };

        $scope.addRow = function (index) {
            var option = {options: ""};
            if ($scope.editQuestion.info.answerOption.length <= index + 1) {
                $scope.editQuestion.info.answerOption.splice(index + 1, 0, option);
            }
        };

        $scope.deleteRow = function ($event, index) {
            if ($event.which == 1)
                $scope.editQuestion.info.answerOption.splice(index, 1);
        };


        getQuestionInfo();
        function getQuestionInfo() {
            QuestionsData.questionInfo($stateParams.questionId).then(function (response) {
                $scope.questionInfo = response;
                $scope.editQuestion.info = $scope.questionInfo;
            });
        }





        $scope.goToQuestionListPage = function () {
            $location.path("/questions");
        };

        $scope.gotoTemplatePage = function () {
            $location.path("/templates");
        };

        $scope.updateQuestion = function (isValid) {
            $scope.editQuestion.info = $scope.questionInfo;
            if (isValid) {
                QuestionsData.update(Question.editFromObject($scope.editQuestion.info)).then(function () {
                    toastr.success("Question updated successfully!", "Success");
                    $scope.questionListsMasterData = QuestionsData.getList();
                    $scope.questionListsData = [].concat($scope.questionListsMasterData);

                    $location.path("/questions");
                }, function (errorMsg) {
                    toastr.error(errorMsg, "Failed");
                });
            }
        };

    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('editQuestion', {
                url: '/editQuestion/:questionId',
                templateUrl: 'app/pages/question/edit-question/edit-question.html',
                controller: editQuestionCtrl,
                title: 'Edit Question'
            })

    }

})();
