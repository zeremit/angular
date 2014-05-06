'use strict';

/* jasmine specs for controllers go here */
describe('Files controllers', function() {

  describe('FileListCtrl', function(){
      var scope, ctrl, $httpBackend,$filterBackend;

      beforeEach(module('fileApp'));
      beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
          $httpBackend = _$httpBackend_;
          $httpBackend.expectGET('data/files.json').
              respond([{name: 'Test'}, {name: 'Test2'}]);

          scope = $rootScope.$new();
          ctrl = $controller('FileListCtrl', {$scope: scope});
      }));


      it('should create "files" model with 2 files fetched from json file', function() {
          expect(scope.files).toBeUndefined();
          $httpBackend.flush();
          expect(scope.files.length).toBe(2);


      });


  });
});
