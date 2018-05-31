define(['App'], function (app) {
    app.register.controller('RegReferrerController',
        ['$scope', '$ionicActionSheet', 'VerificationHelp', 'gToast', 'UsersService', 'HelpAlterService',function ($scope, $ionicActionSheet, VerificationHelp, gToast, UsersService, HelpAlterService) {
            $scope.chose1 = { pic: "img/dagou.png", state: true, number: 1 };
            $scope.chose2 = { pic: "img/dagouweixuan.png", state: false, number: 2 };
            $scope.User = { cityName: "", refName1: "", Phone1: "", refName2: "", Phone2: "", cityId: "" };
            $scope.state = true;
            $scope.changPic = function (state, number) {
         
                if (number == 1) {
                    $scope.chose2.pic = "img/dagouweixuan.png";
                    $scope.chose1.pic = "img/dagou.png";
                    $scope.chose2.state = false;
                    $scope.chose1.state = true;
                } else if (number == 2) {
                    $scope.chose1.pic = "img/dagouweixuan.png";
                    $scope.chose2.pic = "img/dagou.png";
                    $scope.chose1.state = false;
                    $scope.chose2.state = true;
                }
            };

            UsersService.QueryCityList().then(function (data) {
                console.log(data);
                if (data.Success) {
                    $scope.Cities = data.Result;
                    var letter = "";
                    angular.forEach($scope.Cities, function (data, index, array) {
                        if (letter != data.CityCode) {
                            letter = data.CityCode;
                            data.text = "<label class='leftLabel'>" + data.CityName + "</label >" + "<label class='rightLabel'>" + data.CityCode + "</label>";
                        } else {
                            data.text = "<label class='leftLabel'>" + data.CityName + "</label >" + "<label class='rightLabel'></label>";
                        } 
                    }); 
                }
            });
            $scope.SelectCity = function () {
                $ionicActionSheet.show({
                    buttons: $scope.Cities,
                    cancelText: '取 消',
                    buttonClicked: function (index) {
                        $scope.User.cityName = $scope.Cities[index].CityName;
                        $scope.User.cityId = $scope.Cities[index].CityId;
                        return true;
                    }
                });
            };




            var SaveUfoUser = function () {
                UsersService.ufoUser.IsNew = true;
                UsersService.SaveUfoUser(UsersService.ufoUser).then(function (data) {
                    console.log(data);
                    if (data.Success) {
                        gToast.open("注册成功！");
                        HelpAlterService.SetlocalStorage.IsQualified(false);
                        UsersService.ufoUser = new Object;
                        //保存token 
                        HelpAlterService.SetlocalStorage.token(data.Result.AccessToken, false);
                        location.replace("#/RegIdentification/0");
                    } else {
                        gToast.open(data.Error.Message);
                        return false;
                    }
                });
            };



            $scope.Commit = function (state) { 
                if (state == "1") {
                    if ($scope.chose1.state) {
                        UsersService.ufoUser.Recommend = 1;//理财经理

                        if ($scope.User.cityName) {
                            UsersService.ufoUser.ReferrerCity = $scope.User.cityId;
                        } else {
                            gToast.open("请选择城市名称！");
                            return false;
                        }

                        if ($scope.User.refName1) {
                            UsersService.ufoUser.ReferrerName = $scope.User.refName1;
                        } else {
                            gToast.open("请输入理财经理姓名！");
                            return false;
                        }

                        if (!VerificationHelp.PhoneVerification($scope.User.Phone1)) {
                            gToast.open("请输入正确的手机号！");
                            return false;
                        } else {
                            UsersService.ufoUser.ReferrerMobile = $scope.User.Phone1;
                        }
                      
                        UsersService.VerifyManager($scope.User.Phone1, $scope.User.refName1, $scope.User.cityId).then(function (data) {
                            console.log(UsersService.ufoUser);
                            if (!data.Success) {
                                gToast.open(data.Error.Message); 
                                return false;
                            } else {
                                SaveUfoUser();
                            }
                        });
                    } else {
                        UsersService.ufoUser.Recommend = 2;//推荐人
                        //if ($scope.User.refName2) {
                        //    UsersService.ufoUser.ReferrerName = $scope.User.refName2;
                        //} else {
                        //    gToast.open("请输入推荐人姓名！");
                        //    return false;
                        //}
                        if ($scope.User.refName2) {
                            UsersService.ufoUser.ReferrerName = $scope.User.refName2;
                        } else {
                            gToast.open("请输入推荐人姓名或邀请码！");
                            return false;
                        }
                        if ($scope.User.Phone2) {
                            if (!VerificationHelp.PhoneVerification($scope.User.Phone2)) {
                                gToast.open("请输入正确的手机号！");
                                return false;
                            } else {
                                UsersService.ufoUser.ReferrerMobile = $scope.User.Phone2;
                            }
                        }

                        SaveUfoUser();
                    }
                } else {
                    UsersService.ufoUser.Recommend = 3;
                    SaveUfoUser();
                }
              
            };
        }]);
});





