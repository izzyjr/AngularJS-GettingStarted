// Immediately Invoked Function Expression (IIFE)
(function() {

    // reference to module
    var app = angular.module("githubViewer");

    // controller - UserController
    var UserController = function($scope, github, $routeParams) {

        // processes promise
        var onUserComplete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        }

        var onRepos = function(data) {
            $scope.repos = data;
        }

        // handles error
        var onError = function(reason) {
            $scope.error = "Could not fetch the data";
        }

        // URL search
        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        github.getUer($scope.username).then(onUserComplete, onError);

    };

    // register controller in module
    app.controller("UserController", UserController);

    // Minify Syntax
    // app.controller("MainController", ["$scope", "$http", "$interval", MainController]);


}());