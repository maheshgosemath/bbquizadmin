/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.question', [])
        .config(routeConfig).controller('questionCtrl', questionCtrl);

    function questionCtrl($scope, QuestionServices,Upload,$uibModal, toastr, $location,QuestionsData, Question) {

        $scope.questionPageSize = 10;
        getGenreList();

        $scope.newQuestion = {
            form: {},
            info: {
                questionDesc: "",
                questionType: "",
                imagePath:"",
                answerOption: [{
                    label: ""
                }]
            }
        };

        $scope.addRow = function (index) {
            var option = {label: ""};
            if ($scope.newQuestion.info.answerOption.length <= index + 1) {
                $scope.newQuestion.info.answerOption.splice(index + 1, 0, option);
            }
        };

        $scope.deleteRow = function ($event, index) {
            if ($event.which == 1)
                $scope.newQuestion.info.answerOption.splice(index, 1);
        };
        $scope.gotoCreateQuestion = function () {
            $location.path("/createQuestion");
        };
        var ProgressBar;
        $scope.dynamic = 0;
        $scope.imageFile = undefined;
        var uploadService;
        // upload on file select or drop

        $scope.uploadImage = function (file) {
            ProgressBar = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/question/progressbar.html',
                size: 'sm',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
            var curDate = new Date();
            var ImageFolder = $scope.newQuestion.info.imagePath.indexOf("/") >= 0 ? $scope.newQuestion.info.imagePath.split("/")[0] : ("question_option_image" + curDate.getTime());
            uploadService = Upload.upload({
                url: '../rest/files/upload?fn=' + ImageFolder,
                data: {file: file}
            });
            uploadService.then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                toastr.success("Image uploaded successfully", "Success");
                $scope.newQuestion.info.imagePath = resp.data.filePath;
                ProgressBar.close();
            }, function (resp) {
                $scope.dynamic = 0;
                $scope.imageFile = undefined;
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.dynamic = progressPercentage;
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        $scope.cancelUpload = function () {
            if (angular.isDefined(uploadService)) {
                console.info(uploadService);
                $scope.dynamic = 0;
                $scope.picFile = undefined;
                uploadService.abort();

            }
        };
        function getGenreList() {
            QuestionsData.getGenreList().then(function (response) {
                $scope.genreList = response.genredetails;
            });
        }

        getQuestionsList();
        function getQuestionsList() {
            QuestionServices.getList().then(function (response) {
                $scope.questionListsMasterData = response.questionList;
                $scope.questionListsData = [].concat($scope.questionListsMasterData);
            });
        }

        $scope.selected={
            genre:""
        };

        $scope.selectImage = function(file) {
            $scope.imageFile = file;
        }

        $scope.createQuestion = function (isValid) {
            if (isValid) {
                var optionsArr = new Array();
                var options = $scope.newQuestion.info.answerOption;
                var correctAns = $scope.newQuestion.info.correctAnswer;

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
                    quizTitle: $scope.newQuestion.info.questionDesc,
                    optionList: optionsArr
                };
                var data = {
                    quizVO: questionData,
                    genreSeq: $scope.newQuestion.info.genre.seq
                };

                var formData = new FormData();
                formData.append('multipartFile', $scope.imageFile);
                formData.append('addQuestionVO', JSON.stringify(data));

                QuestionsData.create(formData).then(function(data) {
                    toastr.success("Question created successfully");
                });
            }
        };

     /*   $scope.createQuestion = function (isValid) {
            if (isValid) {
                QuestionsData.create(Question.createFromObject($scope.newQuestion.info)).then(function (newdata) {
                    toastr.success("Question created successfully!", "Success");
                    $scope.newQuestion.form.$setPristine();
                    $scope.newQuestion.info = Question.newObject();
                    $scope.questionListsMasterData = newdata;
                    $scope.questionListsData = [].concat($scope.questionListsMasterData);
                    $location.path("/questions");
                }, function (errorMsg) {
                    toastr.error(errorMsg, "Failed");
                });
            }
        };*/

        $scope.editQuestionData = function (item) {
            $location.path("editQuestion/" + item.id);
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
