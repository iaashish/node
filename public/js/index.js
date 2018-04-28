var postApp = angular.module('postApp', []);
postApp.directive('uploadFiles', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFile", { file: files[i] });
                }
            });
        }
    };
});

postApp.controller('postController', function($scope, $http, $interval) {
    $scope.user = {};
    $scope.istrue = false;
    $scope.images = [];
    $scope.disabled= true;

    var promise;

    //1. Used to list all selected files
    $scope.files = [];

    //2. a simple model that want to pass to Web API along with selected files
    $scope.jsonData = {
        name: "Jignesh Trivedi",
        comments: "Multiple upload files"
    };
    //3. listen for the file selected event which is raised from directive
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });

    //4. Post data and selected files.
    $scope.save = function () {
        $http({
            method: 'POST',
            url: "http://localhost:3000/upload1",
            headers: { 'Content-Type': undefined },
           
            transformRequest: function (data) {
                var formData = new FormData();
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            data: { jsonData: $scope.jsonData, files: $scope.files }
        }).
        success(function (data, status, headers, config) {
            // alert('success');
            $scope.disabled = false;
            promise = $interval(getData, 1000);

        }).
        error(function (data, status, headers, config) {
           
        });

        $scope.files = [];
    };

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
            $scope.start = json.data.current;
            $scope.total = json.data.total;
            $scope.istrue = true;
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
        $http.post("/").success(function(message, status) {
            console.log(message);
        })
    };
});