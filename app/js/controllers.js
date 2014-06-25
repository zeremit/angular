var fileApp = angular.module('fileApp', ['ui.bootstrap', 'notify', 'pascalprecht.translate', 'breadCrumbService']);
var size = [ 'B', 'KB', 'MB' ];
var names = [ 'Sophia Parkenson', 'Trinity Clapton', 'Katherine Adamson'];

fileApp.controller('FileListCtrl', function ($scope, $http, $filter, $translate, breadcrumb) {
    $http.get('data/files.json').success(function (data) {
        $scope.files = data;
    });

    $scope.ok = function () {
        breadcrumb.push('archive', "11");
        var links = [{label : '11', href : "#"},{label : '22', href : "#"},{label : '33', href : "#"}];
        breadcrumb.setItems('archive',links);;
    };

    $scope.setLang = function (langKey) {
        // You can change the language during runtime
        $translate.use(langKey);
    };

    $scope.addItem = function () {

        $scope.files.push({
            'name': $scope.fileName,
            'size': Math.floor(Math.random() * 1000) + ' ' + size[Math.floor(Math.random() * size.length)],
            'uplby': names[Math.floor(Math.random() * names.length)],
            'uplon': $filter('date')(new Date(), 'dd/MM/yyyy')
        });

        $scope.fileName = "";

    }
    $scope.rename = false;

    $scope.renameItem = function () {
        if ($scope.selectedFile) {
            $scope.rename = true;
        }
    }

    $scope.deleteItem = function () {
        $scope.files.splice($scope.selectedFile, 1);
        $scope.selectedFile = null;
    }

    $scope.doEnter = function () {
        $scope.selectedFile = null;
        $scope.rename = false;
    }

    $scope.doEsc = function () {
        $scope.files[$scope.files.indexOf($scope.selectedFile)] = $scope.originalFile;
        $scope.selectedFile = null;
        $scope.rename = false;
    }

    $scope.editFileName = function (file) {
        //  $scope.selectedFile.editing = false;
//        if($scope.rename==true && file!=$scope.selectedFile){
//            console.log(file);
//            console.log($scope.selectedFile);
//            $scope.doEnter();
//        }
        $scope.selectedFile = file;
        $scope.originalFile = angular.extend({}, file);
        console.log("edit");
//        file.name = 'aa';
        // Clone the original todo to restore it on demand.
//        $scope.originalTodo = angular.extend({}, todo);
    };

});
fileApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
            if (event.which === 27) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEsc);
                });

                event.preventDefault();
            }
        });
    };
});
fileApp.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

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
});

fileApp.config(['$translateProvider', function ($translateProvider) {

    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
        prefix: 'l10n/',
        suffix: '.json'
    });

    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en_US');

}]);

