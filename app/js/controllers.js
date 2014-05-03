var fileApp = angular.module('fileApp', []);

fileApp.controller('FileListCtrl', function ($scope) {
    $scope.files = [
        {
            'name':     'Project Standart',
            'size':     '32Kb',
            'uplby':    'Trinity Clapton',
            'uplon':    '29/03/2014'
        },
        {
            'name':     'Performance Test Plan',
            'size':     '1MB',
            'uplby':    'Sophia Parkenson',
            'uplon':    '28/03/2014'
        },
        {
            'name':     'Performance Test Result',
            'size':     '12MB',
            'uplby':    'Katherine Adamson',
            'uplon':    '30/03/2014'
        }
    ];

    $scope.addItem = function () {

        $scope.files.push({
            name : 'Samsung',
            'size':     '1MB',
            'uplby':    'Sophia Parkenson',
            'uplon':    '28/03/2014'
        });

    }
});
