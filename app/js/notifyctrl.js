var notifyCtrl = angular.module('notifyApp',['notify']);
notifyCtrl.controller('NotifyCtrl', function($scope, notify){
    $scope.click = function(text){
        notify(text);
    };
});