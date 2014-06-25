'use strict';

/* jasmine specs for controllers go here */
describe('Files controllers', function() {

    describe('FilesListCtrl', function(){

        beforeEach(module('fileApp'));

        it('should create "files" model with 3 files', inject(function($controller) {
            var scope = {},
                ctrl = $controller('FilesListCtrl', {$scope:scope});

            expect(scope.files.length).toBe(3);
        }));

    });
});