/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.corporate', [])
        .config(routeConfig).controller('corporateCtrl', corporateCtrl);

    function corporateCtrl($scope, CompanyServices, $uibModal, toastr) {

        getCorporateList();
        function getCorporateList(){
            CompanyServices.getList().then(function (response) {
                $scope.corporateMasterData = response.companyList;
                $scope.corporatesData = [].concat($scope.corporateMasterData);
            });
        }


        $scope.addCorporate = function (isValid) {
            if (isValid) {
                var data = {
                    corporateName: $scope.newCorporate.info.corporateName,
                    spocName: $scope.newCorporate.info.spocName,
                    spocEmail: $scope.newCorporate.info.spocEmail
                };
                var responseData = CompanyServices.create(data).then(function (response) {
                    $scope.newCorporate.form.$setPristine();
                    $scope.newCorporate.info = "";
                    getCorporateList();
                    toastr.success('Company added successfully.');

                });
            }
        };
      /*  function resetForm() {
            $scope.newCorporate.corporateName = '';
            $scope.newCorporate.spocName = '';
            $scope.newCorporate.spocEmail = '';
        }*/
        $scope.newCorporate = {
            form: {},
            info: {}
        };

        $scope.editCorporate = {
            form: {},
            info: {}
        };
        var editCorporateModalBox;
        $scope.editCorporateData = function (item) {
            $scope.editCorporate.info = item;
            editCorporateModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/corporate/edit-corporate.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
    }


    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('corporate', {
                url: '/corporate',
                controller: corporateCtrl,
                templateUrl: 'app/pages/corporate/corporate-list.html',
                title: 'Corporate',
                sidebarMeta: {
                    icon: 'fa fa-briefcase fa-lg',
                    order: 3,
                }
            });

    }

})();
