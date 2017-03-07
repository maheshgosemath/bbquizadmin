
(function () {
    'use strict';

    angular.module('UApps.services')
        .factory("CompetitionServices", CompetitionServices)

    /** @ngInject */
    function CompetitionServices(HttpService) {

        var httpService = new HttpService("brainbout");
        var CompetitionServices = {
            create: function (obj) {
                return httpService.post("createcompanycompetition", obj);
            }, update: function (obj) {
                return httpService.post("update", obj);
            }, delete: function (id) {
                return httpService.delete("delete/" + id);
            }, getList: function () {
                return httpService.get("competitionlist");
            }, getcompanydetails: function() {
                return httpService.get("companydetails");
            }
        };
        return CompetitionServices;
    }
})();