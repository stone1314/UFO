define(['App'], function (app) {
    app.register.controller('MyAccountController',
        ['$scope', 'UsersService',function ($scope, UsersService) {
            $scope.User = {
                wealthAmt: "",
                headImg: "img/HeadPortrait.jpg",
                profitTotal: "",
                cardNum: 0,
                rpName: "",
                rpMobile:""
            };
            $scope.UserInfo = null;
            UsersService.QueryWealth().then(function (data) {
                console.log(data);
                if (data.Success) {
                    if (data.Result.Data) {
                        $scope.UserInfo = data.Result.Data;
                        console.log($scope.UserInfo); 
                        if (data.Result.Data.Avatar != null && data.Result.Data.Avatar != "") {
                            $scope.User.headImg = data.Result.Data.Avatar;    //头像
                        } 
                    }
                }
            });
        }]);
});
