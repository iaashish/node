var postApp = angular.module('postApp', []);
postApp.controller('postController', function($scope, $http, $interval) {
    $scope.user = {};
    $scope.images = [];
    var dataObj = {
        name: $scope.user.name,
        employees: $scope.employees,
        headoffice: $scope.headoffice
    };
    var promise;

    $scope.init = function() {
        $http.get('/getdata').then(function(json) {
            // $scope.images = json.data;
            for(var a = 0;a<json.data.input.length;a++){
                input = json.data.input[a];
                output = json.data.output[a];
                data = {'input':input, 'output':output};
                $scope.images.push(data);
            }
        });
    };

    function getData() {
        $http.get('/some').then(function(json) {
            console.log(json.data);
            $scope.myObj = {
                "width": json.data.width
            }
            if (json.data.current == json.data.total) {
                $interval.cancel(promise);
            }
        });
    }
    $scope.submitForm = function() {

        promise = $interval(getData, 1000);
        $http.post("/", $scope.user).success(function(message, status) {
            console.log(message);
        })
    };
});