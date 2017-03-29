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

        CompanyServices.getLocationDetails().then(function (response) {
            $scope.locations = response.locationdetails
        });

        $scope.addCorporate = function (isValid) {
            console.log($scope.newCorporate.info);
            if (isValid) {

                var domainList = $scope.newCorporate.info.domain;
                var domains = new Array();
                for(var i=0;i<domainList.length; i++) {
                    domains.push(domainList[i].domainName);
                }

                var data = {
                    corporateName: $scope.newCorporate.info.corporateName,
                    spocName: $scope.newCorporate.info.spocName,
                    spocEmail: $scope.newCorporate.info.spocEmail,
                    domainList: domains
                };
                var responseData = CompanyServices.create(data).then(function (response) {
                    $scope.newCorporate.form.$setPristine();
                    $scope.newCorporate.info = "";
                    getCorporateList();
                    toastr.success('Company added successfully.');

                });
            }
        };

        $scope.newCorporate = {
            form: {},
            info: {
                corporateName:"",
                spocName:"",
                spocEmail:"",
                domain:[{
                    domainName:""
                }]
            }
        };
        $scope.deleteRow = function ($event, index) {
            if ($event.which == 1)
                $scope.newCorporate.info.domain.splice(index, 1);
        };
        $scope.addRow = function (index) {
            var domain = {domainName: ""};
            if ($scope.newCorporate.info.domain.length <= index + 1) {
                $scope.newCorporate.info.domain.splice(index + 1, 0, domain);
            }
        };


        $scope.editCorporate = {
            form: {},
            info: {
                corporateName:"",
                spocName:"",
                spocEmail:"",
                domain:[{
                    domainName:""
                }]
            }
        };

        $scope.editCorporateDetails = function(isValid) {
            if(isValid) {
                var domainList = $scope.editCorporate.info.domain;
                var domains = new Array();
                for(var i=0;i<domainList.length; i++) {
                    domains.push(domainList[i].domainName);
                }

                var data = {
                    corporateSeq: $scope.editCorporate.info.corporateSeq,
                    corporateName: $scope.editCorporate.info.corporateName,
                    spocName: $scope.editCorporate.info.spocName,
                    spocEmail: $scope.editCorporate.info.spocEmail,
                    domainList: domains,
                    locationDetails: $scope.editCorporate.info.locationDetails
                };
                var responseData = CompanyServices.update(data).then(function (response) {
                    $scope.editCorporate.form.$setPristine();
                    editCorporateModalBox.close();
                    getCorporateList();
                    toastr.success('Company updated successfully.');

                });
            }
        };

        var editCorporateModalBox;
        $scope.editCorporateData = function (item) {
            $scope.editCorporate.info.corporateName = item.corporateName;
            $scope.editCorporate.info.spocName = item.spocName;
            $scope.editCorporate.info.spocEmail = item.spocEmail;
            var domainList = item.domainList;
            var domains = new Array();

            for(var i=0;i<domainList.length;i++) {
                var obj = {domainName: domainList[i]};
                domains.push(obj);
            }
            var locations = item.locationDetails;
            var locationIds = new Array();
            for(var i=0; i<locations.length;i++) {
                var locationInfo = {seq: locations[i].seq, name: locations[i].name};
                locationIds.push(locationInfo);
            }
            $scope.editCorporate.info.locationDetails = locationIds;
            $scope.editCorporate.info.corporateSeq=item.corporateSeq;
            $scope.editCorporate.info.domain = domains;
            editCorporateModalBox = $uibModal.open({
                animation: true,
                templateUrl: 'app/pages/corporate/edit-corporate.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                scope: $scope
            });
        };
        $scope.deleteEditRow = function ($event, index) {
            if ($event.which == 1)
                $scope.editCorporate.info.domain.splice(index, 1);
        };
        $scope.addEditRow = function (index) {
            var domain = {domainName: ""};
            if ($scope.editCorporate.info.domain.length <= index + 1) {
                $scope.editCorporate.info.domain.splice(index + 1, 0, domain);
            }
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
