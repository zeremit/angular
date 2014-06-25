var breadCrumbModule = angular.module('breadCrumbService', []).factory('breadcrumb', ['$rootScope', function ($rootScope) {
    var data = {};
    var ensureIdIsRegistered = function (id) {
        if (angular.isUndefined(data[id])) {
            data[id] = [];
        }
    };
    return {
        setItems: function (id, items) {
            data[id] = [];
            data[id] = items;
            $rootScope.$broadcast('breadcrumbsRefresh');
        },
        push: function (id, item) {
            ensureIdIsRegistered(id);
            data[id].push(item);
            $rootScope.$broadcast('breadcrumbsRefresh');
        },
        get: function (id) {
            ensureIdIsRegistered(id);
            return angular.copy(data[id]);
        },
        setLastIndex: function (id, idx) {
            ensureIdIsRegistered(id);
            if (data[id].length > 1 + idx) {
                data[id].splice(1 + idx, data[id].length - idx);
            }
        }
    };
}]).directive('ngBreadCrumbs', function (breadcrumb, $rootScope) {
    return {
        restricted: 'A',
        template: '<ul><li ng-repeat=\'bc in breadcrumbs\'><a ng-click="unregisterBreadCrumb( $index )" href="{{bc.href}}">{{bc.label}}</a><span>|</span></li></ul>',
        replace: true,
        link: function ($scope, element, attrs) {

            var id = attrs['id'];
            $scope.unregisterBreadCrumb = function( index ) {
                breadcrumb.setLastIndex(id, index);
                render();
            };
            var render = function() {
                $scope.breadcrumbs = [];
                angular.forEach(breadcrumb.get(id), function (v) {
                    $scope.breadcrumbs.push(v);
                });
            };
            $rootScope.$on('breadcrumbsRefresh', function () {
                render();
                console.log($scope.breadcrumbs);
            });
        }

    };

});