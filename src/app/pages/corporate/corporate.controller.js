/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('UApps.pages.corporate', [])
        .config(routeConfig).controller('corporateCtrl', corporateCtrl);

    function corporateCtrl($scope, CompanyServices, toastr) {

        CompanyServices.getList().then(function(response) {
            $scope.corporatesData = response.companyList;
        });

        $scope.addCorporate = function(isValid) {
            if(isValid) {
                var data = {
                    corporateName: $scope.newCorporate.corporateName,
                    spocName: $scope.newCorporate.spocName,
                    spocEmail: $scope.newCorporate.spocEmail
                };
                var responseData = CompanyServices.create(data).then(function(response) {
                    toastr.success('Company added successfully.');
                    resetForm();
                });
            }
        }
        function resetForm() {
            $scope.newCorporate.corporateName = '';
            $scope.newCorporate.spocName = '';
            $scope.newCorporate.spocEmail = '';
        }
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
