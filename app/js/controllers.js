var fileApp = angular.module('fileApp', []);
var size = [ 'B', 'KB', 'MB' ];
var names = [ 'Sophia Parkenson', 'Trinity Clapton', 'Katherine Adamson'];

fileApp.controller('FileListCtrl', function ($scope, $http, $filter) {
    $http.get('data/files.json').success(function(data) {
        $scope.files = data;
    });

    $scope.addItem = function () {

        $scope.files.push({
            'name':     $scope.fileName,
            'size':     Math.floor(Math.random()*1000) + ' ' + size[Math.floor(Math.random()*size.length)],
            'uplby':    names[Math.floor(Math.random()*names.length)],
            'uplon':     $filter('date')(new Date(),'dd/MM/yyyy')
        });

        $scope.fileName = "";

    }
    $scope.rename=false;

    $scope.renameItem = function () {
        if($scope.selectedFile){
            $scope.rename=true;
        }
    }

    $scope.deleteItem = function () {
        $scope.files.splice($scope.selectedFile, 1);
        $scope.selectedFile = null;
    }

    $scope.doEnter = function() {
        $scope.selectedFile = null;
        $scope.rename=false;
    }

    $scope.doEsc = function() {
        $scope.files[$scope.files.indexOf($scope.selectedFile)] = $scope.originalFile;
        $scope.selectedFile = null;
        $scope.rename=false;
    }

    $scope.editFileName = function (file) {
      //  $scope.selectedFile.editing = false;
        if($scope.rename==true && file!=$scope.selectedFile){
            console.log(file);
            console.log($scope.selectedFile);
            $scope.doEnter();
        }
        $scope.selectedFile = file;
        $scope.originalFile = angular.extend({},file);
//        file.name = 'aa';
        // Clone the original todo to restore it on demand.
//        $scope.originalTodo = angular.extend({}, todo);
    };

});
fileApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
            if(event.which === 27) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEsc);
                });

                event.preventDefault();
            }
        });
    };
});
