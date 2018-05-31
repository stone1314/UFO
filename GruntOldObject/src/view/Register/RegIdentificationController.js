define(['App'], function (app) {
    app.register.controller('RegIdentificationController',
        ['$scope', 'gToast', 'VerificationHelp', 'UsersService', 'HelpAlterService', '$stateParams',function ($scope, gToast, VerificationHelp, UsersService, HelpAlterService, $stateParams) {
         
            $scope.user = { name: "", idcard: "", email: "", isshow: true };
            if (HelpAlterService.ContractHelp.hasToContract) {
                $scope.user = HelpAlterService.ContractHelp.content;
                if (HelpAlterService.ContractHelp.hasValue) {
                    $scope.user.isshow = true;
                    HelpAlterService.ContractHelp.hasValue = true;
                } 
                HelpAlterService.ContractHelp.hasToContract = false;
            }
            $scope.Commit = function () {
                if ($scope.user.name == "") {
                    gToast.open("请输入姓名！");
                    return false;
                }

                if (!IdCardValidate($scope.user.idcard)) {
                    gToast.open("请输入正确的身份证号！");
                    return false;
                }

                if (!VerificationHelp.EmailVerification($scope.user.email)) {
                    gToast.open("请输入正确的Email！");
                    return false;
                }
                if (!$scope.user.isshow) {
                    gToast.open("请确认协议！");
                    return false;
                }
                UsersService.RealName($scope.user.name, $scope.user.idcard.toUpperCase(), $scope.user.email).then(function (data) {
                    console.log(data)
                    if (data.Success) {
                        HelpAlterService.SetlocalStorage.IsRealName(true);     //实名成功写入全局
                        UsersService.ufoUser = new Object();
                        if ($stateParams.type == 1) {
                            history.back();
                        } else if ($stateParams.type == 2) {
                            location.replace("#/AddBankCards");
                        } else {
                            location.replace("#/ProductTabs/ValueAddedPlan/1");
                        }
                    }
                });
            };



            //合同预览
            $scope.PreviewContrart = function () {
                HelpAlterService.ContractHelp.hasToContract = true; 
                HelpAlterService.ContractHelp.content = $scope.user;
                location.href = "#/RegSetIdentification/1/2/1/0"

            }
        }]);
});
