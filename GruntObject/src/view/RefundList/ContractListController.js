define(['App'], function (app) {
    app.register.controller('ContractListController',
        ['$scope', '$stateParams', 'ProductsService', '$rootScope', 'HelpAlterService', '$stateParams', function ($scope, $stateParams, ProductsService, $rootScope, HelpAlterService, $stateParams) {
            $scope.model = {
                title:'',
                has_ProDetail: false,
                has_PaymentOrder :false
            }
            console.log($stateParams.from);
            if ($stateParams.from == "ProDetail") {
                $scope.model.title = "电子合同"
                $scope.model.has_ProDetail = true;
                $scope.AgreementList = HelpAlterService.GetlocalStorage.Agreement.List();

                //console.log(HelpAlterService.GetlocalStorage.Agreement.List());
                $scope.ContactHref = function (resType, url, title) {
                    if (isiOS) {
                        location.href = url;
                    } else {
                        //HelpAlterService.ContractHelp.contactUrl = url;
                        HelpAlterService.SetlocalStorage.Agreement.Title(title);
                        HelpAlterService.SetlocalStorage.Agreement.Url(url);
                        location.href = "#/RegSetIdentification/0/" + resType + "/0/0";
                    }
                };


            } else if ($stateParams.from == "PaymentOrder") {
                
                $scope.model.title = "电子合同"
                $scope.model.has_PaymentOrder = true;
                ///协议预览
                $scope.ContactHref = function (resType, title) { 
                    HelpAlterService.ContractHelp.hasToContract = true; 
                    HelpAlterService.SetlocalStorage.Agreement.Title(title);
                    location.href = "#/RegSetIdentification/3/" + resType + "/1/" + HelpAlterService.ContractHelp.content.dataDetail.ProductDetail.ContractType;
                }

            }
              
        }]);
});
