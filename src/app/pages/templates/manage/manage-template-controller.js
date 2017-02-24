/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.templates')
        .config(routeConfig).controller('manageTemplateCtrl', manageTemplateCtrl);

    function manageTemplateCtrl($location, $stateParams, toastr, $scope) {


    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('manageTemplate', {
                url: '/manageTemplate/:templateId',
                templateUrl: 'app/pages/templates/manage/manage-template.html',
                controller: manageTemplateCtrl,
                title: 'Manage Template' 
            })

    }

})();
