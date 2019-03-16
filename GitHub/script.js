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

        // function called by ng-click once form is submitted/clicked
        $scope.search = function(username) {
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        };

        // default search
        $scope.username = "angular";
        $scope.message = "GitHub Viewer";

    };

    // register controller in module
    app.controller("MainController", MainController);

    // Minify
    // app.controller("MainController", ["$scope", "$http", MainController]);


}());
