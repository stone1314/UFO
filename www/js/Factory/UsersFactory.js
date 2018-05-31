define(["AppFactory"], function (appFactory) {
    appFactory.factory("UsersService", ['HttpService', '$stateParams', "gToast", "$cookieStore", '$q', 'VerificationHelp', function (HttpService, $stateParams, gToast, $cookieStore, $q, VerificationHelp) {
        var ServiceUrl = {
            QueryWealthURL: 'Trade/QueryWealth',               //查询财富信息  个人中心
            QueryUserDetailURL: 'account/QueryUserDetail',          //用户详细信息
            SmsSendURL: 'account/SmsSend',     //获取短信验证码
            QueryCityListURL: 'other/QueryCityList',     //获取城市列表
            QueryCertificateTypeURL: 'other/QueryCertificateType',      //获取证件类型
            ValidateRecommendedURL: 'account/ValidateRecommended',       //验证客户经理
            RegisterURL: 'account/register',                             //用户注册
            LoginURL: 'Account/Login',                                   //用户登入
            RealnameURL: 'account/realname',                                      //实名验证接口
            ValidateSmsURL: 'account/ValidateSms',                                   //短信验证
            ModifypwdURL: 'account/modifypwd',                                       //修改密码 
            QuerBankCardListURL: 'Bank/QuerBankCardList',                                     //银行卡查询列表
            QuerBankListURL: 'Bank/QuerBankList',                    //查询业务支持的银行列表
            DisableCardURL: 'Bank/DisableCard',                             //停用银行卡
            AddCardURL: 'Bank/AddCard',                                   //添加银行卡
            ValidateUserURL: 'Account/ValidateUser',                      //验证用户是否实名
            ValidateIdNoURL: 'account/ValidateIdNo',                      //验证用户身份
            ResetPwdURL: 'Account/ResetPwd',                              //重置密码
        }

        var userMsg = {};

        // new Object;
        var ufoUser = {
            IsNew: '',
            caAcpt: '',
            regAcpt: '',
            //OpenId:'',
            Mobile: '',
            Password: '',
            CertType: '',
            CertNo: '',
            Captcha: '',
            Recommend: '',      //推荐人类型 1 客户经理，2推荐人，3无 
            ReferrerCity: '',
            ReferrerMobile: '',
            ReferrerName: ''

        };
        var Bank = {
            BankId: "",   //银行卡编号
            BankName: ""//银行卡名称 
        };
        var ResetPwdModel = {
            Mobile: '',
            identificationNo: '',
            identificationOwnerName: '',
            NewPassword: '',
            loginRePassword: '',
            MessageCaptcha: '',
            ressultMessage: null,
            CheckData: function () {
                console.log(ResetPwdModel);
                if (ResetPwdModel.Mobile == null || ResetPwdModel.Mobile == "" || VerificationHelp.PhoneVerification(ResetPwdModel.Mobile) == false) {
                    this.ressultMessage = HttpService.ResultHelp(false, "手机号码不能为空或输入错误！", "");
                    return false;
                }
                if (ResetPwdModel.MessageCaptcha == null || ResetPwdModel.MessageCaptcha == "") {
                    ResetPwdModel.ressultMessage = HttpService.ResultHelp(false, "验证码错误！", "");
                    return false;
                }
                //if (this.identificationNo == null || this.identificationNo == "" || IdCardValidate(this.identificationNo) == false) {
                //    this.ressultMessage = HttpService.ResultHelp(false, "身份证错误！", "");
                //    return false;
                //}
                //if (this.identificationOwnerName == null || this.identificationOwnerName == "") {
                //    this.ressultMessage = HttpService.ResultHelp(false, "真实姓名不能为空！", "");
                //    return false;
                //}
                if (ResetPwdModel.NewPassword == null || ResetPwdModel.NewPassword == "" || !VerificationHelp.PwdVerification(ResetPwdModel.NewPassword) || ResetPwdModel.NewPassword.length > 16 || ResetPwdModel.NewPassword.length < 6) {
                    ResetPwdModel.ressultMessage = HttpService.ResultHelp(false, "密码由6-14位数字和字母组成！", "");
                    return false;
                }
                if (ResetPwdModel.NewPassword != ResetPwdModel.loginRePassword) {
                    ResetPwdModel.ressultMessage = HttpService.ResultHelp(false, "您2次输入的密码不一致，请重新输入！", "");
                    return false;
                }

                return true;
            }
        };
        var phoneCheck = function (value) {
            if (value == null || value == "" || !VerificationHelp.PwdVerification(value) || value.length > 16 || value.length < 6) {
                return {
                    success: false,
                    ressultMessage: HttpService.ResultHelp(false, "密码由6-14位数字和字母组成！", "")
                };
            }
            return true;
        }

        return {
            Bank: Bank,
            ufoUser: ufoUser,
            ResetPwdModel: ResetPwdModel,

            ///*
            ///*  获取以绑银行卡
            ///*
            GetBindingCards: function (onlyEnabled) {
                if (onlyEnabled != "True") {
                    onlyEnabled = "False";
                }
                return HttpService.PostToJson(ServiceUrl.QuerBankCardListURL, { OnlyEnabled: onlyEnabled });
            },
            ///*
            ///*   获取银行卡列表
            ///*
            GetCardBindList: function () {
                return HttpService.PostToJson(ServiceUrl.QuerBankListURL, null);
            },
            ///* 
            ///*  个人中心
            ///*
            QueryWealth: function () {
                return HttpService.PostToJson(ServiceUrl.QueryWealthURL, null);
            },
            ///*
            ///* 查询用户信息(点击头像)
            ///*
            QueryUserDetail: function () {
                return HttpService.PostToJson(ServiceUrl.QueryUserDetailURL, null);//"api/services/app/trade/QueryTradeWealth", null);
            },
            ///*
            ///*   登入
            ///*
            Login: function (PhoneNumber, Password) {
                if (PhoneNumber == null || PhoneNumber == "" || VerificationHelp.PhoneVerification(PhoneNumber) == false) {
                    return HttpService.ResultHelp(false, "手机号码不能为空或输入错误！", "");
                }
                if (VerificationHelp.PwdVerification(Password) == false) {
                    return HttpService.ResultHelp(false, "密码不能为空或输入错误！", "");
                }
                return HttpService.PostToJson(ServiceUrl.LoginURL, { "Mobile": PhoneNumber, "Password": Password })

            },
            ///*
            ///*   登出
            ///*
            Logout: function () {
                return HttpService.PostToJson("account/logout", null);
            },
            ///*
            ///*   修改密码
            ///*
            ModifyPwd: function (oldPwd, newPwd) {
                if (phoneCheck(oldPwd).success == false) {
                    return phoneCheck(oldPwd).ressultMessage;
                }
                if (!VerificationHelp.PwdVerification(newPwd)) {
                    return HttpService.ResultHelp(false, "密码由6-14位数字和字母组成！", "");
                }
                return HttpService.PostToJson(ServiceUrl.ModifypwdURL, {
                    "OldPassword": oldPwd, "NewPassword": newPwd
                });

            },
            ///*
            ///*     发送短信
            ///*     PhoneNumber: 手机号码
            ///*     messageCaptcha：1、注册 2、记密码 3、绑定银行卡 4、绑定新手机 5、购买理财产品
            ///*
            GetSms: function (PhoneNumber, messageCaptcha) {

                if (PhoneNumber == null || PhoneNumber == "" || VerificationHelp.PhoneVerification(PhoneNumber) == false) {
                    return HttpService.ResultHelp(false, "手机号码不能为空或输入错误！", "");
                }
                return HttpService.PostToJson(ServiceUrl.SmsSendURL, { "Mobile": PhoneNumber, "MessageCaptcha": messageCaptcha })
            },
            ///* 
            ///*    获取城市列表
            ///*
            QueryCityList: function () {
                return HttpService.PostToJson(ServiceUrl.QueryCityListURL, null);

            },
            ///*
            ///*    验证客户经理     手机号码   姓名   城市
            ///*
            VerifyManager: function (Mobile, Name, CityId) {
                return HttpService.PostToJson(ServiceUrl.ValidateRecommendedURL, { "Mobile": Mobile, "Name": Name, "CityId": CityId });
            },
            ///*
            ///*     获取证件类型
            ///*
            QueryCertificateType: function () {
                return HttpService.PostToJson(ServiceUrl.QueryCertificateTypeURL, null);

            },
            ///*
            ///*     用户注册
            ///*
            SaveUfoUser: function (ufoUser) {
                console.log(ufoUser);
                return HttpService.PostToJson(ServiceUrl.RegisterURL, ufoUser);

            },
            ///
            ///     验证短信验证码
            ///
            SendValidCode: function (mobile, type, captcha, imageCaptcha) {//MessageCaptcha:1、注册 2、记密码 3、绑定银行卡 4、绑定新手机 5、购买理财产品
                if (mobile == null || mobile == "" || VerificationHelp.PhoneVerification(mobile) == false) {
                    return HttpService.ResultHelp(false, "手机号码不能为空或输入错误！", "");
                }
                //if (captcha == null || validataCode == "") {
                //    return HttpService.ResultHelp(false, "验证码不能为空", "");
                //} 

                return HttpService.PostToJson(ServiceUrl.ValidateSmsURL, {
                    "Mobile": mobile, "MessageCaptcha": type, "Captcha": captcha, "ImageCaptcha": imageCaptcha
                });
            },
            ///*
            ///*    验证用户身份
            ///*
            VerifyIdNo: function (mobile, identificationNo, identificationOwnerName) {
                if (mobile == null || mobile == "" || VerificationHelp.PhoneVerification(mobile) == false) {
                    return HttpService.ResultHelp(false, "手机号码不能为空或输入错误！", "");
                }
                if (identificationOwnerName == null || identificationOwnerName == "") {
                    return HttpService.ResultHelp(false, "姓名不能为空！", "");
                }
                if (identificationNo == null || identificationNo == "" || IdCardValidate(identificationNo) == false) {
                    return HttpService.ResultHelp(false, "身份证错误！", "");
                }

                return HttpService.PostToJson(ServiceUrl.ValidateIdNoURL, { "Mobile": mobile, "IdNo": identificationNo, "Name": identificationOwnerName });

            },
            ///*
            ///*   重置密码
            ///*
            ResetPwd: function () {

                if (ResetPwdModel.CheckData() == false) {
                    return ResetPwdModel.ressultMessage;
                } else {
                    ResetPwdModel.ressultMessage = null;
                    ResetPwdModel.mobile = ResetPwdModel.PwdSetVerifyMobile;
                }
                console.log(ResetPwdModel.ressultMessage)
                return HttpService.PostToJson(ServiceUrl.ResetPwdURL, ResetPwdModel);
            },
            CurrentLoginInformations: function () {
                return HttpService.AjaxToJsonUnLoading("api/services/app/Session/CurrentLoginInformations", null);
            },
            permissionCheck: function () {
                // 返回一个承诺(promise).
                var deferred = $q.defer();
                this.QueryUserDetail().then(function (data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },
            ///*
            ///*    实名验证接口   
            ///*
            RealName: function (name, cardid, email) {
                if (name == null || name == "") {
                    return HttpService.ResultHelp(false, "姓名不能为空！", "");
                }
                if (cardid == null || cardid == "" || IdCardValidate(cardid) == false) {
                    return HttpService.ResultHelp(false, "身份证错误！", "");
                }
                if (email == null || email == "" || VerificationHelp.EmailVerification(email) == false) {
                    return HttpService.ResultHelp(false, "邮箱地址错误！", "");
                }


                return HttpService.PostToJson(ServiceUrl.RealnameURL,
               { "IdentityName": name, "IdentityId": cardid, "Email": email });
            },
            ///*
            ///*  绑定银行卡 2.1
            ///*
            BindCard: function (bankCardNo, bankId, bankMobile, bankName, cardOwnerName, validateCode) {
                return HttpService.PostToJson(ServiceUrl.AddCardURL, { "bankCardNo": bankCardNo, "bankId": bankId, "bankMobile": bankMobile, "bankName": bankName, "cardOwnerName": cardOwnerName, "validateCode": validateCode });
            },

            ////
            ///*  解绑银行卡 2.1
            ///*
            DelCard: function (BankCardId, password) {
                return HttpService.PostToJson(ServiceUrl.DisableCardURL, {
                    "BankCardId": BankCardId, "Password": password
                });
            },

            ///*
            ///*   验证用户实名 
            ///*
            VerifyMobile: function (mobile) {
                if (mobile == null || mobile == "" || VerificationHelp.PhoneVerification(mobile) == false) {
                    return HttpService.ResultHelp(false, "手机号码不能为空或输入错误！", "");
                }
                return HttpService.PostToJson(ServiceUrl.ValidateUserURL, { mobile: mobile });
            },
            //理财中  已退出  合同
            GetFinance: function (currentPage, pageSize, quitStatus) {
                return HttpService.AjaxToJsonUnLoading("api/services/app/Trade/QueryContract", { "currentPage": currentPage, "pageSize": pageSize, "quitStatus": quitStatus });
            },
            ////查询单笔理财详情
            //GetQueryAssertInfo: function (contractNo) {
            //    if (!contractNo) {
            //        return HttpService.ResultHelp(false, "合同号不能为空！", "");
            //    }
            //    return HttpService.AjaxToJson("api/services/app/Trade/QueryAssertInfo", { "contractNo": contractNo });
            //}, 
        }
    }]);

});