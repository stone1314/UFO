define(['App'], function (app) {
    app.register.controller('GetBankCardsController',
      ['$scope', 'gToast', 'UsersService', '$state', 'HelpAlterService',function ($scope, gToast, UsersService, $state, HelpAlterService) {
          if (HelpAlterService.ContractHelp.content == null) {
              history.back();
          }
         
          $scope.viewModel = {
              chose: true,
              bankRecordId: HelpAlterService.ContractHelp.content.dataCard.BankCardId
          }
          
          $scope.banks = [];
          UsersService.GetBindingCards("True").then(function (data) {
              console.log(data);
              if (data.Success) {
                  $scope.banks = data.Result;
              }
          });

          $scope.ChoseCard = function (card) {
              HelpAlterService.ContractHelp.content.dataCard = card;
              history.back();
          };
          //添加银行卡
          $scope.AddBankCardsFun = function () {
              if (HelpAlterService.GetlocalStorage.IsRealName() == 'true') {
                  location.href = "#/AddBankCards";
              } else {
                  var pop = HelpAlterService.Confirmation($scope, "<div style='width:100%;text-align:center;'>您必须通过实名认证后才能绑定银行卡</div>", "取消", "立即认证")
                  pop.then(function (e) {
                      console.log(e);
                      if (e) {
                          location.href = "#/RegIdentification/2";
                      }
                  });

              }
          };

      }]);
});
