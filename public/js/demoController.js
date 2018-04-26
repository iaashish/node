app.controller("demoController", function ($scope, $http) {
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
                formData.append("jsonData", angular.toJson(data.jsonData));
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            data: { jsonData: $scope.jsonData, files: $scope.files }
        }).
        success(function (data, status, headers, config) {
            alert("success!");
        }).
        error(function (data, status, headers, config) {
            alert("failed!");
        });
    };
});