angular.module('plunker', []);
var ModalDemoCtrl = function ($scope, $modal, $log) {

    $scope.user = {
        user: 'name',
        password: null
    };

    $scope.open = function () {

        $modal.open({
            templateUrl: 'dialog/myModal.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {
                $scope.user = user;
                $scope.submit = function () {
                    $log.log('Submiting user info.');
                    $log.log(user);
                    $modalInstance.dismiss('cancel');
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                user: function () {
                    return $scope.user;
                }
            }
        });
    };
};