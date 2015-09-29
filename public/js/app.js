(function(app) {
    'use strict';

    app.controller('LookupController', [
        '$scope',
        '$http',
        function($scope, $http) {
            $scope.submit = function() {
                $http({
                    method: 'POST',
                    url: '/lookup',
                    data: $scope.query
                })
                .success(function(data) {
                    $scope.results = data;
                });
            };
        }
    ]);

})(angular.module('ganSourceMapConsumer', []));
