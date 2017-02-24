/**
 * Created by Sandeep on 9/9/2016.
 */
(function () {
    'use strict';

    angular.module('UApps.services')
        .factory("TemplateServices", TemplateServices)
        .service("TemplatesData", TemplatesData)
        .service("Template", Template);

    /** @ngInject */
    function TemplateServices(HttpService) {

        var httpService = new HttpService("template");

        var TemplateServices = {
            create: function (obj) {
                return httpService.post("create", obj);
            }, update: function (obj) {
                return httpService.post("update", obj);
            }, delete: function (id) {
                return httpService.delete("delete/" + id);
            }, getList: function () {
                return httpService.get("list");
            }, templateInfo: function (templateId) {
                return httpService.get("templateInfo/" + templateId);
            }
        };
        return TemplateServices;
    }

    /** @ngInject */
    function TemplatesData(TemplateServices, Template, DataObject) {

        var TemplatesData = new DataObject();
        TemplatesData.load = function () {
            var self = this;
            return TemplateServices.getList().then(function (data) {
                return self.rows = data.templateResponseList;
            });
        };
        TemplatesData.create = function (obj) {
            var self = this;
            if (obj.hasOwnProperty("templateId"))
                delete obj.templateId;
            return TemplateServices.create(obj).then(function (data) {
                obj.templateId = data.message;
                self.rows.push(obj);
                return self.rows;
            });
        };

        TemplatesData.update = function (obj) {
            var self = this;
            return TemplateServices.update(obj).then(function (data) {
                var index = TemplatesData.getRowIndexByTemplateId(obj.templateId);
                self.rows[index] = obj;
                return data;
            });
        };


        TemplatesData.templateInfo = function (templateId) {
            var self = this;
            return TemplateServices.templateInfo(templateId).then(function (data) {
                return data;
            });
        };

        return TemplatesData;
    }

    /** @ngInject */
    function Template($filter) {
        var Template = {

        };

        return Template;

    }


})();
