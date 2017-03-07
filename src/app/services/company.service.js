
(function () {
    'use strict';

    angular.module('UApps.services')
        .factory("CompanyServices", CompanyServices)

    /** @ngInject */
    function CompanyServices(HttpService) {

        var httpService = new HttpService("brainbout");
        var CompanyServices = {
            create: function (obj) {
                return httpService.post("createcompany", obj);
            }, update: function (obj) {
                return httpService.post("update", obj);
            }, delete: function (id) {
                return httpService.delete("delete/" + id);
            }, getList: function () {
                return httpService.get("companylist");
            }
        };
        return CompanyServices;
    }
})();