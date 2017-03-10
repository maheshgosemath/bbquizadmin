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
            getGenreList();
            $scope.quizSeq = $stateParams.questionId;
            var data = {
                quizSeq: $scope.quizSeq
            };
            QuestionsData.questionInfo(data).then(function (response) {
                $scope.questionInfo = response;
                $scope.editQuestion.info = $scope.questionInfo;
                initEdit(response);
            });
        }

        function initEdit(data) {
            $scope.editQuestion.info.questionDesc = data.quizVO.quizTitle;
            var options = data.quizVO.optionList;
            var optionList = new Array();
            for(var i=0;i<options.length;i++) {
                var obj = {label: options[i].optionTitle}
                optionList.push(obj);
                if(options[i].optionSeq == data.correctAnswer) {
                    $scope.editQuestion.info.correctAnswer = i + 1;
                }
            }
            $scope.editQuestion.info.answerOption = optionList;

            var genreList = $scope.genreList;
            for(var i=0;i<genreList.length;i++) {
                if(genreList[i].seq == data.genreSeq) {
                    $scope.editQuestion.info.genre = genreList[i];
                }
            }
        }

        function getGenreList() {
            QuestionsData.getGenreList().then(function (response) {
                $scope.genreList = response.genredetails;
            });
        }

        $scope.goToQuestionListPage = function () {
            $location.path("/questions");
        };

        $scope.gotoTemplatePage = function () {
            $location.path("/templates");
        };

        $scope.updateQuestion = function (isValid) {
            if (isValid) {
                var optionsArr = new Array();
                var options = $scope.editQuestion.info.answerOption;
                var correctAns = $scope.editQuestion.info.correctAnswer;

                for(var i=0;i<options.length;i++) {
                    var obj = new Object();
                    obj.optionTitle = options[i].label;
                    obj.isCorrect = 'N';
                    if(correctAns == (i+1)) {
                        obj.isCorrect = 'Y';
                    }
                    optionsArr.push(obj);
                }

                var questionData = {
                    quizTitle: $scope.editQuestion.info.questionDesc,
                    optionList: optionsArr,
                    quizSeq: $scope.quizSeq
                };
                var data = {
                    quizVO: questionData,
                    genreSeq: $scope.editQuestion.info.genre.seq
                };

                var formData = new FormData();
                formData.append('multipartFile', $scope.imageFile);
                formData.append('addQuestionVO', JSON.stringify(data));

                QuestionsData.update(formData).then(function(data) {
                    $location.path("/question");
                    toastr.success("Question updated successfully");
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
