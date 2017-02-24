/**
 * Created by LENOVO on 13-12-2016.
 */
/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.templates', [])
        .config(routeConfig).controller('TemplatesCtrl', TemplatesCtrl);

    function TemplatesCtrl($location, toastr,TemplatesData, $uibModal , $scope, AuthenticationService) {

        $scope.templateListsData = $scope.templateListsMasterData = TemplatesData.getList();
        $scope.templatePageSize = 10;
        $scope.statusOptions = [
            {id: 'A', text: 'Active'},
            {id: 'I', text: 'InActive'}
        ];

        var createModalBox;

        $scope.gotoCreateTemplate = function (item) {
            createModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/templates/create-template.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };




        $scope.newTemplate = {
            form: {},
            info: {
                templateDesc:""
            }
        };

        $scope.createTemplate = function (isValid) {
            if (isValid) {
                TemplatesData.create($scope.newTemplate.info).then(function (newdata) {
                    toastr.success("Template created successfully!", "Success");
                    $scope.newTemplate.form.$setPristine();
                    $scope.newTemplate.info ="";
                    $scope.templateListsMasterData = newdata;
                    $scope.templateListsData = [].concat($scope.templateListsMasterData);
                    createModalBox.close();
                }, function (errorMsg) {
                    toastr.error(errorMsg, "Failed");
                });
            }
        };

        $scope.deleteTemplate = function (id) {
            TemplatesData.delete(id).then(function () {
                toastr.success("Template deleted successfully!", "Success");
                $scope.templateListsMasterData = TemplatesData.getList();
                $scope.templateListsData = [].concat($scope.templateListsMasterData);
            }, function (errorMsg) {
                toastr.error(errorMsg, "Failed");
            });
        };

        $scope.updateTemplate = function (item) {
            TemplatesData.update(Template.updateTemplateObject(item)).then(function () {
                toastr.success("Template updated successfully!", "Success");
            }, function (errorMsg) {
                toastr.error(errorMsg, "Failed");
            });
        };


        $scope.goToManageTemplate = function (item) {
            $location.path("/manageTemplate/" + item.id);
        };
    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('templates', {
                url: '/templates',
                templateUrl: 'app/pages/templates/template-list.html',
                controller: TemplatesCtrl,
                title: 'Templates',
                sidebarMeta: {
                    icon: 'fa fa-list-alt',
                    order: 2
                }
            })
    }

})();
