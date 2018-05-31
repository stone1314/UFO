define(['App'], function (app) {
    app.register.controller('RegSetIdentificationController',
        ['$scope', 'HelpAlterService', '$stateParams', '$sce',function ($scope, HelpAlterService, $stateParams, $sce) {
            $scope.isshow = true;
            $scope.viewModel = {
                title: "用户注册协议",
                url: $sce.trustAsResourceUrl(RestWebHost.Host + "Contract/PreviewContract?type=" + $stateParams.type + "&resType=" + $stateParams.resType + "&conType=" + $stateParams.conType + "&ProType=" + $stateParams.pid)
            };
            $scope.viewModel.title = HelpAlterService.GetlocalStorage.Agreement.Title();
            if ($stateParams.type == 0) {
                if (HelpAlterService.GetlocalStorage.Agreement.Url() == null) {
                    history.back();
                }
                $scope.viewModel.url = $sce.trustAsResourceUrl(HelpAlterService.GetlocalStorage.Agreement.Url());
            };

            $scope.Ok = function () {
                HelpAlterService.ContractHelp.hasValue = true;
                history.back();
            };

        }]);
});
