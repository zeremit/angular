angular.module('app', ['pascalprecht.translate'])

    .config(['$translateProvider', function($translateProvider){

        // Register a loader for the static files
        // So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].
        $translateProvider.useStaticFilesLoader({
            prefix: 'l10n/',
            suffix: '.json'
        });

        // Tell the module what language to use by default
        $translateProvider.preferredLanguage('en_US');

    }])

    .controller('ctrl', ['$scope', '$translate', function($scope, $translate) {

        $scope.setLang = function(langKey) {
            // You can change the language during runtime
            $translate.use(langKey);
        };

    }]);