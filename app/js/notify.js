angular.module('notify', []).factory('notify',['$timeout','$http','$compile','$templateCache','$rootScope',
    function($timeout,$http,$compile,$templateCache,$rootScope){

        var startTop = 10;
        var verticalSpacing = 5;
        var duration = 10000;
        var defaultTemplate = 'angular-notify.html';
        var position = 'right';
        var container = document.body;

        var messageElements = [];

        var notify = function(args){

            if (typeof args !== 'object'){
                args = {message:args};
            }

            args.template = args.template ? args.template : defaultTemplate;
            args.position = args.position ? args.position : position;
            args.container = args.container ? args.container : container;

            var scope = args.scope ? args.scope.$new() : $rootScope.$new();
            scope.$message = args.message;

            $http.get(args.template,{cache: $templateCache}).success(function(template){

                var templateElement = $compile(template)(scope);
                templateElement.bind('webkitTransitionEnd oTransitionEnd otransitionend transitionend msTransitionEnd', function(e){
                    if (e.propertyName === 'opacity' ||
                        (e.originalEvent && e.originalEvent.propertyName === 'opacity')){
                        templateElement.remove();
                        messageElements.splice(messageElements.indexOf(templateElement),1);
                        layoutMessages();
                    }
                });

                angular.element(args.container).append(templateElement);
                messageElements.push(templateElement);

                if (args.position === 'center'){
                    $timeout(function(){
                        templateElement.css('margin-left','-' + (templateElement[0].offsetWidth /2) + 'px');
                    });
                }

                scope.$close = function(){
                    templateElement.css('opacity',0);
                };

                var layoutMessages = function(){
                    var currentY = startTop;
                    for(var i = messageElements.length - 1; i >= 0; i --){
                        var element = messageElements[i];
                        var top = currentY;
                        currentY += messageElements[i][0].offsetHeight + verticalSpacing;
                        element.css('top',top + 'px');
                    }
                };


                    layoutMessages();

                if (duration > 0){
                    $timeout(function(){
                        console.log('close');
                        scope.$close();
                    },duration);
                }

            }).error(function(data){
                throw new Error('Template specified for notify ('+args.template+') could not be loaded. ' + data);
            });



        };

        notify.config = function(args){
            startTop = !angular.isUndefined(args.top) ? args.top : startTop;
            verticalSpacing = !angular.isUndefined(args.verticalSpacing) ? args.verticalSpacing : verticalSpacing;
            duration = !angular.isUndefined(args.duration) ? args.duration : duration;
            defaultTemplate = args.template ? args.template : defaultTemplate;
            position = !angular.isUndefined(args.position) ? args.position : position;
            container = args.container ? args.container : container;
        };



        return notify;
    }
]);

angular.module('notify').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('angular-notify.html',
            "<div class=\"message\">\n" +
            "\t{{$message}}\n" +
            "</div>"
    );

}]);
