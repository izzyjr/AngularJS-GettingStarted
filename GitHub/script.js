// Immediately Invoked Function Expression (IIFE)
(function() {

    // creating module
    var app = angular.module("githubViewer", []);

    // controller - MainController
    var MainController = function($scope, $http, $interval) {

        // processes promise
        var onUserComplete = function(response) {
            $scope.user = response.data;
            // requesting promise on user's properties
            $http.get($scope.user.repos_url)
                .then(onRepos, onError);
        }

        var onRepos = function(response) {

            $scope.repos = response.data;

        }

        // handles error
        var onError = function(reason) {
            $scope.error = "Could not fetch the data";
        }

        var decrementCountdown = function() {
            $scope.countdown -= 1;
            if($scope.countdown < 1) {
                $scope.search($scope.username);
            }

        }

        // function called by ng-click once form is submitted/clicked
        $scope.search = function(username) {
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        };

        var startCountdown = function() {
            $interval(decrementCountdown, 1000, $scope.countdown);
        }

        // default search
        $scope.username = "angular";
        $scope.message = "GitHub Viewer";
        // default orderBy parameter
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;
        startCountdown();

    };

    // register controller in module
    app.controller("MainController", MainController);

    // Minify Syntax
    // app.controller("MainController", ["$scope", "$http", "$interval", MainController]);


}());
