// Immediately Invoked Function Expression (IIFE)
(function() {

    // creating module
    var app = angular.module("githubViewer", []);

    // controller - MainController
    var MainController = function($scope, $http) {

        // processes promise
        var onUserComplete = function(response) {
            $scope.user = response.data;
        }

        // handles error
        var onError = function(reason) {
            $scope.error = "Could not fetch the user";
        }

        $http.get("https://api.github.com/users/robconery")
            .then(onUserComplete, onError);


        $scope.message = "Hello Angular";

    };

    // register controller in module
    app.controller("MainController", MainController);

}());
