define(['App'], function (app) {
    app.register.controller('RegSetPwdController',
        ['$scope', function ($scope) {
            $scope.isshow = true;
            $scope.isshow2 = true;


            $scope.image1 = "img/mima.png";
            $scope.state1 = false;
            $scope.txt1 = "password";

            $scope.image2 = "img/mimakejian.png";
            $scope.state2 = true;
            $scope.txt2 = "text";

            $scope.changImg = function (num) {
                if (num == 1) {
                    if ($scope.state1) {
                        $scope.image1 = "img/mima.png";
                        $scope.state1 = false;
                        $scope.txt1 = "password";
                    } else {
                        $scope.image1 = "img/mimakejian.png";
                        $scope.state1 = true;
                        $scope.txt1 = "text";

                    }
                } else if (num == 2) {
                    if ($scope.state2) {
                        $scope.image2 = "img/mima.png";
                        $scope.state2 = false;
                        $scope.txt2 = "password"
                    } else {
                        $scope.image2 = "img/mimakejian.png";
                        $scope.state2 = true;
                        $scope.txt2 = "text";
                    }
                }
            };
        }]);
});
