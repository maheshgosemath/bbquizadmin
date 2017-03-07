
(function () {
    'use strict';

    angular.module('UApps.services')
        .factory("QuestionServices", QuestionServices)
        .service("QuestionsData", QuestionsData)
        .service("Question", Question);

    /** @ngInject */
    function QuestionServices(HttpService) {

        var httpService = new HttpService("brainbout");
        var QuestionServices = {
            create: function (obj) {
                var config = {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }
                return httpService.post("createquestion", obj, config);
            }, update: function (obj) {
                return httpService.post("update", obj);
            }, delete: function (id) {
                return httpService.delete("delete/" + id);
            }, getList: function () {
                return httpService.get("questionlist");
            }, questionInfo: function (questionId) {
                return httpService.get("questionInfo/" + questionId);
            }, getGenreList: function () {
                return httpService.get("genredetails" );
            }
        };
        return QuestionServices;
    }

    /** @ngInject */
    function QuestionsData(QuestionServices, DataObject) {

        var QuestionsData = new DataObject();
        QuestionsData.load = function () {
            var self = this;
            return QuestionServices.getList().then(function (data) {
                return self.rows = data.questions;
            });
        };
        QuestionsData.create = function (obj) {
            //var self = this;
            return QuestionServices.create(obj).then(function (data) {
                //obj.id = data.message;
                //self.rows.push(obj);
                return data;
            });
        };
        QuestionsData.delete = function (id) {
            var self = this;
            return QuestionServices.delete(id).then(function (data) {
                var index = self.getRowIndexById(id);
                self.rows.splice(index, 1);
                return data;
            });
        };
        QuestionsData.update = function (obj) {
            var self = this;
            return QuestionServices.update(obj).then(function (data) {
                var index = self.getRowIndexById(obj.id)
                self.rows[index] = obj;
                return data;
            });
        };
        QuestionsData.answerByQuestion = function (questionId) {
            var self = this;
            return QuestionServices.answerByQuestion(questionId).then(function (data) {
                return data.answerResponseList;
            });
        };
        QuestionsData.questionInfo = function (questionId) {
            var self = this;
            return QuestionServices.questionInfo(questionId).then(function (data) {
                return data;
            });
        };
        QuestionsData.getGenreList = function () {
            return QuestionServices.getGenreList().then(function (data) {
                return data;
            });
        };


        return QuestionsData;
    }

    /** @ngInject */
    function Question() {
        var Question = {
            newObject: function () {
                return {

                }
            },

            createFromObject: function (obj) {
                return {
                    id: obj.id,
                    questionDesc: obj.questionDesc,
                    questionType: obj.questionType,
                    imagePath:obj.imagePath
                }

            },
            editFromObject: function (obj) {
                return {
                    id: obj.id,
                    questionDesc: obj.questionDesc,
                    questionType: obj.questionType,
                    parentAnswerId: angular.isDefined(obj) ? obj.parentAnswerId : null,
                    parentQuestionId: angular.isDefined(obj) ? obj.parentQuestionId : null,
                    answerOption: obj.options,
                    answerSymbol: obj.answerSymbol,
                    threshold : obj.threshold
                }

            }

        };

        return Question;

    }


})();