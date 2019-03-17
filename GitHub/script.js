// Immediately Invoked Function Expression (IIFE)
(function() {

    // creating module
    var app = angular.module("githubViewer", []);

    // controller - MainController
    var MainController = function($scope, github, $interval,
                                  $log, $anchorScroll, $location) {

        // processes promise
        var onUserComplete = function(data) {
            $scope.user = data;
            github.getRepos($scope.user).then(onRepos, onError);
        }

        var onRepos = function(data) {
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();

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

        var countdownInterval = null;
        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        }

        // function called by ng-click once form is submitted/clicked
        $scope.search = function(username) {
            $log.info("Searching for..." + username);
            github.getUer(username).then(onUserComplete, onError);
            if(countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

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
