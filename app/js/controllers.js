var fileApp = angular.module('fileApp', []);
var size = [ 'B', 'KB', 'MB' ];
var name = [ 'Sophia Parkenson', 'Trinity Clapton', 'Katherine Adamson'];

fileApp.controller('FileListCtrl', function ($scope, $http, $filter) {
    $http.get('data/files.json').success(function(data) {
        $scope.files = data;
    });

    $scope.addItem = function () {

        $scope.files.push({
            'name':     $scope.fileName,
            'size':     Math.floor(Math.random()*1000) + ' ' + size[Math.floor(Math.random()*size.length)],
            'uplby':    name[Math.floor(Math.random()*name.length)],
            'uplon':     $filter('date')(new Date(),'dd/MM/yyyy')
        });

        $scope.fileName = "";

    }
});
